package at.vegastro.resource;

import at.vegastro.model.Restaurant;
import at.vegastro.model.User;
import at.vegastro.repository.RestaurantRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;

@Path("/restaurant")
public class RestaurantResource {

    @Inject
    RestaurantRepository restaurantRepository;

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
}
