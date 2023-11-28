package at.vegastro.repository;

import at.vegastro.model.Image;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ImageRepository implements PanacheRepository<Image> {
}
