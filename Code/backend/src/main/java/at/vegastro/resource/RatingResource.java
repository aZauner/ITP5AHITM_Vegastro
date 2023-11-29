package at.vegastro.resource;

import at.vegastro.dtos.UpdateRatingDto;
import at.vegastro.model.Rating;
import at.vegastro.model.Restaurant;
import at.vegastro.repository.RatingRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDateTime;
import java.util.List;

@Path("/rating")
public class RatingResource {

    @Inject
    RatingRepository ratingRepository;

    @GET
    @Path("/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Rating> findRatings(@PathParam("userId") Long userId) {
           return ratingRepository.findbyUsertoken(userId);
    }

    @Transactional
    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public void createRating(Rating rating) {
        ratingRepository.postRating(rating);
    }

    @GET
    @Path("/byRestaurant/{restaurantId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Rating> findByRestaurant(@PathParam("restaurantId") Long restaurantId) {
        return ratingRepository.findByRestaurant(restaurantId);
    }

    @Transactional
    @PUT
    @Path("/updateRating")
    @Produces(MediaType.APPLICATION_JSON)
    public void updateRating(UpdateRatingDto updateRating) {
        ratingRepository.updateRating(updateRating);
    }

    @Transactional
    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteRating(@PathParam("id") Long id) {
        ratingRepository.deleteRating(id);
    }

}
