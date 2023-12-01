package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Ratingupvotes extends PanacheEntity {
    @ManyToOne
    public User user;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Rating rating;
    
}
