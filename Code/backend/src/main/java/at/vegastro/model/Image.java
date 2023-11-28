package at.vegastro.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Image extends PanacheEntity {
    public String imageName;
    public byte[] imageData;
}
