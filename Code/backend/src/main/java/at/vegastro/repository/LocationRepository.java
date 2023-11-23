package at.vegastro.repository;

import at.vegastro.model.Location;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class LocationRepository implements PanacheRepository<Location> {


}
