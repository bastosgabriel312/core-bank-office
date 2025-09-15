package br.com.corebank.backoffice.rest;

import br.com.corebank.backoffice.config.AbstractPostgresContainerTest;
import br.com.corebank.backoffice.config.TestSecurityConfig;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
import br.com.corebank.backoffice.rest.agency.AgencyRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.testcontainers.junit.jupiter.Testcontainers;
import reactor.test.StepVerifier;

@ActiveProfiles("test")
@Import({TestSecurityConfig.class})
@Testcontainers
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CreateAgencyRestControllerTest extends AbstractPostgresContainerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private AgencyRepository agencyRepository;



    @Test
    void shouldCreateAgencyViaApi() {
        var request = new AgencyRequest(
                "Agência teste",
                "AGT",
                "Rua teste",
                "SP",
                0.5,
                2.0
        );

        webTestClient.post()
                .uri("/agencies")
                .bodyValue(request)
                .exchange()
                .expectStatus().isCreated();

        StepVerifier.create(agencyRepository.findAll())
                .expectNextMatches(agency ->
                        agency.getName().equals("Agência teste") &&
                                agency.getCode().equals("AGT") &&
                                agency.getState().equals("SP"))
                .verifyComplete();
    }
}
