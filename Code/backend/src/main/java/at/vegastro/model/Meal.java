package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;


@Entity
public class Meal extends PanacheEntity {
    public String title;
    public String description;
    public String type;
    public String price;
    public String allergic;
    public Boolean active;
}


