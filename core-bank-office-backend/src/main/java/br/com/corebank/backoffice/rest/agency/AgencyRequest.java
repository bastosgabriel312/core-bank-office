package br.com.corebank.backoffice.rest.agency;

import jakarta.validation.constraints.*;

public record AgencyRequest(
        @NotBlank(message = "O nome da agência não pode ser nulo")
        @Size(min = 3, max = 50, message = "O nome da agência deve ter entre 3 e 50 caracteres")
        String name,

        @NotBlank(message = "O código da agência não pode ser nulo")
        @Size(min = 3, max = 50, message = "O código da agência deve ter entre 3 e 50 caracteres")
        String code,

        @NotBlank(message = "O endereço da agência não pode ser nulo")
        @Size(min = 3, max = 150, message = "O endereço da agência deve ter entre 3 e 150 caracteres")
        String address,

        @NotBlank(message = "O estado da agência não pode ser nulo")
        @Size(min = 2, max = 50, message = "O estado da agência deve ter entre 2 e 50 caracteres")
        String state,

        @NotNull(message = "A coordenada X não pode ser nula")
        @DecimalMin(value = "-180.0", inclusive = true, message = "A coordenada X deve estar entre -180.0 e 180.0")
        @DecimalMax(value = "180.0", inclusive = true, message = "A coordenada X deve estar entre -180.0 e 180.0")
        Double posX,

        @NotNull(message = "A coordenada Y não pode ser nula")
        @DecimalMin(value = "-90.0", inclusive = true, message = "A coordenada Y deve estar entre -90.0 e 90.0")
        @DecimalMax(value = "90.0", inclusive = true, message = "A coordenada Y deve estar entre -90.0 e 90.0")
        Double posY
) {}
