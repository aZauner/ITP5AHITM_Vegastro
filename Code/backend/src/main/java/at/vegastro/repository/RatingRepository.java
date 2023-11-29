package at.vegastro.repository;

import at.vegastro.dtos.UpdateRatingDto;
import at.vegastro.model.Rating;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class RatingRepository implements PanacheRepository<Rating> {
    @Inject
     UserRepository userRepository;
    
    public List<Rating> findbyUsertoken(Long userId) {
       return find("user", userRepository.find("id", userId)).list();
    }

    public void postRating(Rating rating) {
        rating.date = LocalDateTime.now();
        persist(rating);
    }

    public List<Rating> findByRestaurant(Long restaurantId) {
        return find("restaurant.id", restaurantId).list();
    }

    public void updateRating(UpdateRatingDto updateRating) {
        Rating rating = findById(updateRating.id);
        rating.comment = updateRating.comment;
        rating.stars = updateRating.rating;
        this.getEntityManager().merge(rating);
    }

    public void deleteRating(Long id) {
        deleteById(id);
    }
}
