package at.vegastro.repository;


import at.vegastro.model.Rating;
import at.vegastro.model.Ratingupvotes;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class RatingupvotesRepository implements PanacheRepository<Ratingupvotes> {
    public void create(Ratingupvotes ratingupvote) {
        persist(ratingupvote);
    }

    public List<Ratingupvotes> findByUser(Long userId) {
        return find("user.id", userId).list();
    }

    public Long getSum(Long ratingId){
        return find("rating.id", ratingId).count();
    }
}
