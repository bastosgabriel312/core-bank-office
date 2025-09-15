package br.com.corebank.backoffice.rest.agency;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AgencyResponse {
    private Long id;
    private String name;
    private String code;
    private String state;
    private String address;
    private Double posX;
    private Double posY;
}
