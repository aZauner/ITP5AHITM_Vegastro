package at.vegastro.resource;

import at.vegastro.model.Meal;
import at.vegastro.model.Restaurant;
import at.vegastro.repository.MealRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/meal")
public class MealResource {

    @Inject
    MealRepository mealRepository;

    @GET
    @Path("/{title}")
    @Produces(MediaType.APPLICATION_JSON)
    public Meal getByTitle(@PathParam("title") String title) {
        return mealRepository.getByTitle(title);
    }

    @Transactional
    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createMeal(Meal meal) {
        mealRepository.createRestaurant(meal);
    }

    @GET
    @Path("/getById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Meal getByTitle(@PathParam("id") Long id) {
        return mealRepository.getMealById(id);
    }
}
