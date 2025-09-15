package br.com.corebank.backoffice.usecases;

import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DeleteAgencyUseCase {

    private final AgencyRepository repository;

    public Mono<Void> execute(Long id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Agency not found")))
                .flatMap(agency -> {
                    agency.setActive(false);
                    return repository.save(agency);
                })
                .then();
    }

}
