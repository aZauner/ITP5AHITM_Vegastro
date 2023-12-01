package at.vegastro.resource;

import at.vegastro.dtos.ChangeMealStatusDto;
import at.vegastro.dtos.ChangeMealValuesDto;
import at.vegastro.model.Meal;
import at.vegastro.model.Restaurant;
import at.vegastro.repository.MealRepository;
import at.vegastro.repository.RestaurantRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
import java.util.Optional;

@Path("/meal")
public class MealResource {

    @Inject
    MealRepository mealRepository;

    @Inject
    RestaurantRepository restaurantRepository;

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
    public Meal createMeal(Meal meal) {
        return mealRepository.createMeal(meal);
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

    @DELETE
    @Path("/deleteMeal/{mealId}/{restaurantId}")
    @Transactional
    public void delete(@PathParam("mealId") Long mealId, @PathParam("restaurantId") Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId);
        Optional<Meal> result = restaurant.menu.stream()
                .filter(obj -> obj.id.equals(mealId))
                .findFirst();

        restaurant.menu.remove(result.get());
    }

    @Transactional
    @PUT
    @Path("/changeActiveStatus")
    @Consumes(MediaType.APPLICATION_JSON)
    public void changeActive(ChangeMealStatusDto changeMealStatusValues) {
        mealRepository.changeActive(changeMealStatusValues.mealId);
    }


    @PUT
    @Transactional
    @Path("/changeMealValues")
    @Consumes(MediaType.APPLICATION_JSON)
    public void changeMealValues(ChangeMealValuesDto changeMealStatusValues) {
        mealRepository.changeValues(changeMealStatusValues);
    }
}
