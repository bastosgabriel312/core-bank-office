package br.com.corebank.backoffice.domain.agency;

import br.com.corebank.backoffice.rest.agency.AgencyRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("agency")
public class Agency {
    @Id
    private Long id;
    private String name;
    private String code;
    private String address;
    private String state;
    private Double posX;
    private Double posY;
    private boolean active;

    @Transient
    private Double distance;

    public Agency(String name, String code, String address, String state, Double posX, Double posY) {
        this.name = name;
        this.code = code;
        this.address = address;
        this.state = state;
        this.posX = posX;
        this.posY = posY;
        this.active = true;
    }


    public static Agency of(AgencyRequest request) {
        return new Agency(request.name(),
                request.code(),
                request.address(),
                request.state(),
                request.posX(),
                request.posY()
        );
    }
}
