package br.com.corebank.backoffice.rest;

import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.usecases.ListAgencyUseCase;
import br.com.corebank.backoffice.usecases.ListNearbyAgencieUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicRestController {

    private final ListNearbyAgencieUseCase listNearbyAgencieUseCase;

    @GetMapping("/agencies")
    public Mono<PageImpl<Agency>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            String sort,
            String direction,
            Double posX,
            Double posY) {

        Pageable pageRequest;
        if(sort == null || direction == null || sort.isEmpty() || direction.isEmpty()) {
            pageRequest = PageRequest.of(page, size);
        } else {
            pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sort);
        }
        return listNearbyAgencieUseCase.execute(pageRequest, posX, posY);
    }


}
