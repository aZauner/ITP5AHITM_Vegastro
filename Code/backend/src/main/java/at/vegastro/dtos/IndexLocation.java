package at.vegastro.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class IndexLocation {
    private String city;
    private String plz;
    private String street;

    @JsonCreator
    public IndexLocation(@JsonProperty("city") String city,@JsonProperty("plz") String plz,@JsonProperty("street") String street) {
        this.city = city;
        this.plz = plz;
        this.street = street;
    }

    @JsonCreator
    public IndexLocation() {
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPlz() {
        return plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
