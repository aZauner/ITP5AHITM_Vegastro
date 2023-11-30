package at.vegastro.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.LinkedList;
import java.util.List;

@Entity
public class Restaurant extends PanacheEntity {
    public String restaurantName;
    public Double latitude;
    public Double longitude;
    @ManyToOne
    @JsonIgnore
    public User owner;

    public String type;
    public String description;
    @OneToOne
    public Location location;
    @OneToMany
    public List<Meal> menu = new LinkedList<>();

    @OneToOne
    public Image image;
}
