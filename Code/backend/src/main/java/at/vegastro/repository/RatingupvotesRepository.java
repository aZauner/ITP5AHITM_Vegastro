package at.vegastro.repository;


import at.vegastro.model.Ratingupvotes;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RatingupvotesRepository implements PanacheRepository<Ratingupvotes> {
}
