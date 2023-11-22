package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.LinkedList;
import java.util.List;

@Entity
public class Restaurant extends PanacheEntity {
    public String restaurantName;
    public Double latitude;
    public Double longitude;
    @ManyToOne
    public User owner;

    public String type;
    public String description;
    @ManyToOne
    public LocationRestaurant locationRestaurant;
    @OneToMany
    public List<Meal> menu = new LinkedList<>();

    public String image;
}
