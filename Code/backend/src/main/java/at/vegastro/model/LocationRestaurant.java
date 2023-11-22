package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class LocationRestaurant extends PanacheEntity {
    public String city;
    public Integer plz;
    public String street;
    public Integer housenumber;
    public Integer floor;
    public Integer doornumber;
}
