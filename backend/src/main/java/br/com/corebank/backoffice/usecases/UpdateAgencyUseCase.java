package br.com.corebank.backoffice.usecases;

import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import br.com.corebank.backoffice.rest.agency.AgencyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UpdateAgencyUseCase {
    private final AgencyRepository repository;
    private final GetAgencyUseCase getUseCase;

    public Mono<Agency> execute(Long id, AgencyRequest request) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Agency not found")))
                .flatMap(agency -> {
                    agency.setName(request.name());
                    agency.setCode(request.code());
                    agency.setAddress(request.address());
                    agency.setState(request.state());
                    agency.setPosX(request.posX());
                    agency.setPosY(request.posY());
                    return repository.save(agency);
                });
    }




}
