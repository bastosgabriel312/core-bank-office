package br.com.corebank.backoffice.usecases;

import br.com.corebank.backoffice.domain.agency.Agency;

import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ListAgencyUseCase {

    private final AgencyRepository repository;

    public Mono<PageImpl<Agency>> execute(Pageable pageable) {
        return this.repository.findAllByActiveTrue(pageable)
                .collectList()
                .zipWith(this.repository.countAllByActiveTrue())
                .map(p -> new PageImpl<>(p.getT1(), pageable, p.getT2()));
    }
}
