package br.com.corebank.backoffice.rest;

import br.com.corebank.backoffice.config.AbstractPostgresContainerTest;
import br.com.corebank.backoffice.config.TestSecurityConfig;
import br.com.corebank.backoffice.domain.agency.Agency;
import br.com.corebank.backoffice.domain.agency.AgencyRepository;
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
class ListAgencyRestControllerTest extends AbstractPostgresContainerTest {
    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private AgencyRepository agencyRepository;

    @Test
    void shouldListAgenciesViaApi() {
        this.initAgencies();
        webTestClient.get().uri("/agencies?page=0&size=5&sort=name&direction=asc")
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody()
                .jsonPath("$.content[0].name").isEqualTo("Agência BH")
                .jsonPath("$.content[0].code").isEqualTo("BHZ")
                .jsonPath("$.content[0].address").isEqualTo("Praça Sete, 50")
                .jsonPath("$.content[0].state").isEqualTo("Minas Gerais")

                .jsonPath("$.content[1].name").isEqualTo("Agência Centro")
                .jsonPath("$.content[1].code").isEqualTo("CTR")
                .jsonPath("$.content[1].address").isEqualTo("Rua A, 100")
                .jsonPath("$.content[1].state").isEqualTo("São Paulo")

                .jsonPath("$.content[2].name").isEqualTo("Agência Paulista")
                .jsonPath("$.content[2].code").isEqualTo("PAU")
                .jsonPath("$.content[2].address").isEqualTo("Av. Paulista, 1500")
                .jsonPath("$.content[2].state").isEqualTo("São Paulo")

                .jsonPath("$.content[3].name").isEqualTo("Agência Rio")
                .jsonPath("$.content[3].code").isEqualTo("RIO")
                .jsonPath("$.content[3].address").isEqualTo("Av. Atlântica, 2000")
                .jsonPath("$.content[3].state").isEqualTo("Rio de Janeiro");


        this.cleanAgencies();
    }

    @Test
    void shoudPageAgenciesViaApi() {
        this.initAgencies();

        webTestClient.get().uri("/agencies?page=0&size=1&sort=name&direction=asc")
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody()
                .jsonPath("$.content[0].name").isEqualTo("Agência BH")
                .jsonPath("$.content[0].code").isEqualTo("BHZ")
                .jsonPath("$.content[0].address").isEqualTo("Praça Sete, 50")
                .jsonPath("$.content[0].state").isEqualTo("Minas Gerais");

        this.cleanAgencies();
    }

    @Test
    void shoudListNearbyAgenciesViaApi() {
        this.initAgencies();

        webTestClient.get().uri("/public/agencies?page=0&size=5&posX=-23.695433284614662&posY=-46.53766484218626")
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody()

                .jsonPath("$.content[0].name").isEqualTo("Agência Centro")
                .jsonPath("$.content[0].code").isEqualTo("CTR")
                .jsonPath("$.content[0].address").isEqualTo("Rua A, 100")
                .jsonPath("$.content[0].state").isEqualTo("São Paulo")

                .jsonPath("$.content[1].name").isEqualTo("Agência Paulista")
                .jsonPath("$.content[1].code").isEqualTo("PAU")
                .jsonPath("$.content[1].address").isEqualTo("Av. Paulista, 1500")
                .jsonPath("$.content[1].state").isEqualTo("São Paulo");

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
