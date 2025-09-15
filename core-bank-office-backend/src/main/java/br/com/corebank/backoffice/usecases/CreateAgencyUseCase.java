package br.com.corebank.backoffice.usecases;

import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CreateAgencyUseCase {

    private final AgencyRepository repository;

    public Mono<Agency> execute(Agency agency) {
        return repository.save(agency);
    }
}
