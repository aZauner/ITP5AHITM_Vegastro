package at.vegastro.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
public class Restaurant extends PanacheEntity {
    public String restaurantName;
    public Double latitude;
    public Double longitude;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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
