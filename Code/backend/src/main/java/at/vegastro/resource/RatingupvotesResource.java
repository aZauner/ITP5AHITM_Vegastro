package at.vegastro.resource;

import at.vegastro.dtos.DeleteRatingUpvoteDto;
import at.vegastro.model.Rating;
import at.vegastro.model.Ratingupvotes;
import at.vegastro.repository.RatingupvotesRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDateTime;
import java.util.List;

@Path("/ratingupvotes")
public class RatingupvotesResource {

    @Inject
    RatingupvotesRepository ratingupvotesRepository;

    @Transactional
    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public void createRatingUpvote(Ratingupvotes ratingupvote) {
        ratingupvotesRepository.create(ratingupvote);
    }

    @GET
    @Path("getByUser/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Ratingupvotes> findByRestaurant(@PathParam("userId") Long userId) {
        return ratingupvotesRepository.findByUser(userId);
    }

    @GET
    @Path("getSumVotes/{ratingId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Long getSum(@PathParam("ratingId") Long ratingId) {
        return ratingupvotesRepository.getSum(ratingId);
    }

    @PUT
    @Transactional
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public void delete(DeleteRatingUpvoteDto deleteRatingUpvote) {
        System.out.println(deleteRatingUpvote.ratingId);
        System.out.println(deleteRatingUpvote.userId);
        ratingupvotesRepository.deleteUpvote(deleteRatingUpvote.ratingId, deleteRatingUpvote.userId);
    }
}
