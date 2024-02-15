package at.vegastro.resource;

import at.vegastro.dtos.AddMealToRestaurantDto;
import at.vegastro.model.JwtPayload;
import at.vegastro.model.Restaurant;
import at.vegastro.model.User;
import at.vegastro.repository.RestaurantRepository;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.io.IOException;
import java.net.URI;
import java.util.Base64;
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
    public List<Restaurant> getByOwner(@PathParam("id") Long id, @HeaderParam("Authorization") String token) throws JsonProcessingException {
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        Gson g = new Gson();
        JwtPayload jwtPayload = g.fromJson(payload, JwtPayload.class);
        if(jwtPayload.getResource_access().get("vegastro").getRoles().get(0) == "admin_role") {
            return restaurantRepository.list("owner.id", id);
        }
        return null;
    }
}
