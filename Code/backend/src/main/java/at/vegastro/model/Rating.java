package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
public class Rating extends PanacheEntity {
    @ManyToOne
    public User user;
    @ManyToOne
    public Restaurant restaurant;
    public Double stars;
    public String comment;
    public LocalDateTime date;


}
