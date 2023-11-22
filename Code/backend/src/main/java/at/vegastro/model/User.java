package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name="Users")
public class User extends PanacheEntity {
    public String firstname;
    public String lastname;
    @Column(unique = true)
    public String username;
    @Column(unique = true)
    public String email;
    public String password;
    @OneToMany
    public List<Restaurant> favouriteRestaurants = new LinkedList<>();
}
