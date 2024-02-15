package at.vegastro.resource;

import at.vegastro.dtos.AddMealToRestaurantDto;
import at.vegastro.model.Restaurant;
import at.vegastro.model.User;
import at.vegastro.repository.RestaurantRepository;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.net.URI;
import java.util.List;

@Path("/restaurant")
public class RestaurantResource {

    @Inject
    RestaurantRepository restaurantRepository;

    @Inject
    JsonWebToken jsonWebToken;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant findOne(@PathParam("id") Long id) {
        return restaurantRepository.getById(id);

    }

    @Transactional
    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public void createRestaurant(Restaurant restaurant) {
        restaurantRepository.createRestaurant(restaurant);
    }

    @GET
    @Path("/getNearPosition/{northLat}/{northLon}/{southLat}/{southLon}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Restaurant> findRestaurantsNearPosition(@PathParam("northLat") Double northLat ,
                                                        @PathParam("northLon") Double northLon,
                                                        @PathParam("southLat") Double southLat,
                                                        @PathParam("southLon") Double southLon) {
        return restaurantRepository.findRestaurantsNearPosition(northLat,northLon,southLat ,southLon);

    }

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Restaurant> getAll() {
        return restaurantRepository.getAll();

    }
    
    @Transactional
    @PUT
    @Path("/addMealToMenu")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addMealToMenu(AddMealToRestaurantDto mealData ) {
        restaurantRepository.addMealToMenu(mealData.mealid, mealData.restaurantid);
    }

    @GET
    @Path("/getByOwner/{id}")
    public List<Restaurant> getByOwner(@PathParam("id") Long id) {
        return restaurantRepository.list("owner.id", id);
    }
}
