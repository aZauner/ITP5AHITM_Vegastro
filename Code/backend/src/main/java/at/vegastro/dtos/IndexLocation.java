package at.vegastro.dtos;

public class IndexLocation {
    private String city;
    private String plz;
    private String street;

    public IndexLocation(String city, String plz, String street) {
        this.city = city;
        this.plz = plz;
        this.street = street;
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
