package br.com.corebank.backoffice.rest;

import br.com.corebank.backoffice.config.AbstractPostgresContainerTest;
import br.com.corebank.backoffice.config.TestSecurityConfig;
import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.testcontainers.junit.jupiter.Testcontainers;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

@ActiveProfiles("test")
@Import({TestSecurityConfig.class})
@Testcontainers
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DeleteAgencyRestControllerTest extends AbstractPostgresContainerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private AgencyRepository agencyRepository;

    @Test
    void shouldDeleteAgencyViaApi() {
        this.initAgencies();

        Agency agency = agencyRepository.findAll().blockFirst();
        Assertions.assertNotNull(agency, "Agência não deve ser nula");

        webTestClient.delete()
                .uri("/agencies/" + agency.getId())
                .exchange()
                .expectStatus().isNoContent();

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "name"));
        List<Agency> activeAgencies = agencyRepository.findAllByActiveTrue(pageable)
                .collectList()
                .block();

        assertNotNull(activeAgencies);
        assertFalse(activeAgencies.stream().anyMatch(a -> a.getId().equals(agency.getId())),
                "A agência deletada não deve estar na lista de ativas");

        this.cleanAgencies();
    }


    void initAgencies() {
        var agencies = List.of(
                new Agency("Agência Centro", "CTR", "Rua A, 100", "São Paulo", -23.5505, -46.6333),
                new Agency("Agência Paulista", "PAU", "Av. Paulista, 1500", "São Paulo", -23.5617, -46.6558),
                new Agency("Agência Rio", "RIO", "Av. Atlântica, 2000", "Rio de Janeiro", -22.9711, -43.1822),
                new Agency("Agência BH", "BHZ", "Praça Sete, 50", "Minas Gerais", -19.9191, -43.9386));

        StepVerifier.create(agencyRepository.saveAll(agencies))
                .expectNextCount(4)
                .verifyComplete();
    }

    void cleanAgencies() {
        StepVerifier.create(agencyRepository.deleteAll())
                .expectNextCount(0)
                .verifyComplete();
    }
}
