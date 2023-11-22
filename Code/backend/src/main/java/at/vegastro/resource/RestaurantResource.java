package at.vegastro.resource;

import at.vegastro.repository.RestaurantRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/restaurant")
public class RestaurantResource {

    @Inject
    RestaurantRepository restaurantRepository;

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCourt() {
        return "fds";
    }
}
