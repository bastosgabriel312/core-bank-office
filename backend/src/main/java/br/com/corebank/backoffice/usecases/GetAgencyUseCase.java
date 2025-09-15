package br.com.corebank.backoffice.usecases;

import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import br.com.corebank.backoffice.rest.agency.AgencyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class GetAgencyUseCase {

    private final AgencyRepository repository;

    public Mono<AgencyResponse> execute(Long id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Agency not found")))
                .map(agency -> AgencyResponse.builder()
                        .id(agency.getId())
                        .name(agency.getName())
                        .code(agency.getCode())
                        .state(agency.getState())
                        .address(agency.getAddress())
                        .posX(agency.getPosX())
                        .posY(agency.getPosY()).build());
    }
}
