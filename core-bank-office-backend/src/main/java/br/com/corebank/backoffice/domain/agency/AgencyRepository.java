package br.com.corebank.backoffice.domain.agency;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Repository
public interface AgencyRepository extends ReactiveSortingRepository<Agency, Long>, ReactiveCrudRepository<Agency, Long> {
    Flux<Agency> findAllByActiveTrue(Pageable pageable);

    Mono<Long> countAllByActiveTrue();


}
