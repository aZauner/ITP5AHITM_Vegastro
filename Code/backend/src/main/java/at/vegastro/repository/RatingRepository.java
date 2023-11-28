package at.vegastro.repository;

import at.vegastro.model.Rating;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class RatingRepository implements PanacheRepository<Rating> {
    @Inject
     UserRepository userRepository;
    public List<Rating> findbyUsertoken(Long userId) {
       return find("user", userRepository.find("id", userId)).list();
    }

    public void postRating(Rating rating) {
        persist(rating);
    }

    public List<Rating> findByRestaurant(Long restaurantId) {
        return find("restaurant.id", restaurantId).list();
    }
}
