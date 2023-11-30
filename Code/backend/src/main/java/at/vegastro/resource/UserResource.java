package at.vegastro.resource;

import at.vegastro.dtos.FavouriteRestaurantDto;
import at.vegastro.dtos.LoginUserDto;
import at.vegastro.dtos.UpdateUserDto;
import at.vegastro.model.Restaurant;
import at.vegastro.model.User;
import at.vegastro.repository.MealRepository;
import at.vegastro.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;

@Path("/user")
public class UserResource {

    @Inject
    UserRepository userRepository;

    @Transactional
    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    public URI createUser(User user, @Context UriInfo uriInfo) {
        userRepository.createUser(user);
        return uriInfo.getAbsolutePathBuilder().path(Long.toString(user.id)).build();
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Long loginUser(LoginUserDto loginData) {
        return userRepository.loginUser(loginData);
    }

    @GET
    @Path("{id}")
    public User getUserByID(Long id) {
        return userRepository.findById(id);
    }

    @GET
    @Path("/favourites/{id}")
    public List<Restaurant> getFavourites(Long id) {
        return userRepository.findById(id).favouriteRestaurants;
    }

    @PUT
    @Transactional
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public String update(UpdateUserDto data) {
        return userRepository.updateUser(data);
    }

    @PUT
    @Transactional
    @Path("/addFvouriteRestaurant")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addFavRestaurant(FavouriteRestaurantDto data) {
        userRepository.addFavourite(data);
    }

    @PUT
    @Transactional
    @Path("/removeFvouriteRestaurant")
    @Consumes(MediaType.APPLICATION_JSON)
    public void removeFavRestaurant(FavouriteRestaurantDto data) {
        userRepository.removeFavourite(data);
    }
}
