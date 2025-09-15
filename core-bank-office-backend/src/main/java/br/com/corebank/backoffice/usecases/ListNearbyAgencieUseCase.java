package br.com.corebank.backoffice.usecases;

import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import br.com.corebank.backoffice.domain.agency.AgencyRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor
public class ListNearbyAgencieUseCase {
    private final AgencyRepository repository;
    private final AgencyRepositoryCustom repositoryCustom;

    public Mono<PageImpl<Agency>> execute(Pageable pageable, Double posX, Double posY) {
        return posX != null && posY != null ? findNearby(posX, posY, pageable) : listAll(pageable);
    }

    public Mono<PageImpl<Agency>> findNearby(double posX, double posY, Pageable pageable) {
        int offset = (int) pageable.getOffset();
        int limit = pageable.getPageSize();

        Flux<Agency> agenciesFlux = this.repositoryCustom.findNearby(posX, posY, limit, offset);
        Mono<Long> totalMono = this.repository.countAllByActiveTrue();

        return agenciesFlux.collectList()
                .zipWith(totalMono)
                .map(tuple -> new PageImpl<>(tuple.getT1(), pageable, tuple.getT2()));
    }

    private Mono<PageImpl<Agency>> listAll(Pageable pageable) {
        return repository.findAllByActiveTrue(pageable)
                .collectList()
                .zipWith(repository.countAllByActiveTrue())
                .map(p -> new PageImpl<>(p.getT1(), pageable, p.getT2()));

    }

}
