package at.vegastro.repository;


import at.vegastro.model.Rating;
import at.vegastro.model.Ratingupvotes;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public void deleteUpvote(Long ratingId, Long userId) {
        Map<String, Long> params = new HashMap<>();
        params.put("ratingId", ratingId);
        params.put("userId", userId);

        delete("user.id = ?1 and rating.id= ?2", userId, ratingId);
    }
}
