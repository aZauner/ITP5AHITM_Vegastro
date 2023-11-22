package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Ratingupvotes extends PanacheEntity {
    @ManyToOne
    public User user;
    @ManyToOne
    public Rating rating;
}
