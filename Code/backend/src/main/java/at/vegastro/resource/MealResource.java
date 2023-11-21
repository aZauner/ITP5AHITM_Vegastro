package at.vegastro.resource;

import at.vegastro.repository.MealRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/meal")
public class MealResource {

    @Inject
    MealRepository mealRepository;

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCourt() {
        return mealRepository.getString();
    }
}
