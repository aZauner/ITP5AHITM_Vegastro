package at.vegastro.resource;

import at.vegastro.dtos.ChangeMealStatusDto;
import at.vegastro.model.Meal;
import at.vegastro.model.Restaurant;
import at.vegastro.repository.MealRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

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

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Meal> getAll() {
        return mealRepository.getAll();
    }

    @Transactional
    @PUT
    @Path("/changeActiveStatus")
    @Consumes(MediaType.APPLICATION_JSON)
    public void chnageActive(ChangeMealStatusDto changeMealStatusValues) {
        mealRepository.chnageActive(changeMealStatusValues.mealId);
    }

    @Transactional
    @PUT
    @Path("/changeMealValues")
    @Consumes(MediaType.APPLICATION_JSON)
    public void changeMealValues(ChangeMealStatusDto changeMealStatusValues) {
        mealRepository.chnageActive(changeMealStatusValues.mealId);
    }
}
