package br.com.corebank.backoffice.rest.agency;

import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.usecases.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.net.URI;

@RestController
@RequestMapping("/agencies")
@RequiredArgsConstructor
public class AgencyRestController {

    private final CreateAgencyUseCase createUseCase;
    private final ListAgencyUseCase listUseCase;
    private final GetAgencyUseCase getUseCase;
    private final UpdateAgencyUseCase updateUseCase;
    private final DeleteAgencyUseCase deleteUseCase;

    @PostMapping
    public Mono<ResponseEntity<Void>> create(@RequestBody @Valid AgencyRequest dto) {
        return createUseCase.execute(Agency.of(dto))
                .map(created -> ResponseEntity.created(URI.create("/agencies/" + created.getId())).build());
    }

    @GetMapping
    public Mono<PageImpl<Agency>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction) {
        Pageable pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sort);
        return listUseCase.execute(pageRequest);
    }

    @GetMapping("/{id}")
    public Mono<AgencyResponse> get(@PathVariable Long id) {
        return getUseCase.execute(id);
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Void>> update(@PathVariable Long id, @RequestBody  @Valid AgencyRequest dto) {
        return updateUseCase.execute(id, dto)
                .then(Mono.just(ResponseEntity.noContent().build()));
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return deleteUseCase.execute(id)
                .then(Mono.just(ResponseEntity.noContent().build()));
    }
}
