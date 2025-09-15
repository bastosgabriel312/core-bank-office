package br.com.corebank.backoffice.domain.agency;

import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.Locale;

@Repository
public class AgencyRepositoryCustom {

    private final R2dbcEntityTemplate template;

    public AgencyRepositoryCustom(R2dbcEntityTemplate template) {
        this.template = template;
    }

    private int sanitizeLimit(Integer limit) {
        return Math.max(1, Math.min(limit, 100));
    }

    private int sanitizeOffset(Integer offset) {
        return Math.max(offset, 0);
    }

    public Flux<Agency> findNearby(Double posX, Double posY, Integer limit, Integer offset) {
        limit = sanitizeLimit(limit);
        offset = sanitizeOffset(offset);

        String sql = String.format(Locale.US,
                "SELECT * FROM find_nearby_agencies(%f, %f, %d, %d)",
                posX, posY, limit, offset
        );

        return template.getDatabaseClient()
                .sql(sql)
                .map((row, meta) -> {
                    Agency a = template.getConverter().read(Agency.class, row);

                    a.setDistance(row.get("distance", Double.class));
                    return a;
                })
                .all();
    }


}
