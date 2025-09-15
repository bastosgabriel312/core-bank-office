package br.com.corebank.backoffice.rest;

import br.com.corebank.backoffice.config.AbstractPostgresContainerTest;
import br.com.corebank.backoffice.config.TestSecurityConfig;
import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import br.com.corebank.backoffice.rest.agency.AgencyRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.testcontainers.junit.jupiter.Testcontainers;
import reactor.test.StepVerifier;

import java.util.List;

@ActiveProfiles("test")
@Import({TestSecurityConfig.class})
@Testcontainers
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UpdateAgencyRestControllerTest extends AbstractPostgresContainerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private AgencyRepository agencyRepository;

    @Test
    void shouldUpdateAgencyViaApi() {
        initAgencies();
        Agency agency = agencyRepository.findAll().blockFirst();
        Assertions.assertNotNull(agency);

        var request = new AgencyRequest(
                "Agência teste",
                "AGT",
                "Rua teste",
                "SP",
                0.5,
                2.0
        );

        webTestClient.put()
                .uri("/agencies/" + agency.getId())
                .bodyValue(request)
                .exchange()
                .expectStatus().isNoContent();

        agencyRepository.findById(agency.getId())
                .blockOptional()
                .ifPresent(updatedAgency -> {
                    Assertions.assertEquals("Agência teste", updatedAgency.getName());
                    Assertions.assertEquals("AGT", updatedAgency.getCode());
                    Assertions.assertEquals("SP", updatedAgency.getState());
                    Assertions.assertEquals(0.5, updatedAgency.getPosX(), 0.0001);
                    Assertions.assertEquals(2.0, updatedAgency.getPosY(), 0.0001);
                });
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
