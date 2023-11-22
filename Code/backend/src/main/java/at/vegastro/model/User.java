package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name="Users")
public class User extends PanacheEntity {
    public String firstname;
    public String lastname;
    public String username;
    public String email;
    public String password;
    @OneToMany
    public List<Restaurant> favouriteRestaurants = new LinkedList<>();
}
