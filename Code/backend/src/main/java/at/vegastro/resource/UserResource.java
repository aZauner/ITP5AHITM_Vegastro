package at.vegastro.resource;

import at.vegastro.dtos.LoginUserDto;
import at.vegastro.model.User;
import at.vegastro.repository.MealRepository;
import at.vegastro.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;

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

    @GET
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Long loginUser(LoginUserDto loginData) {
        return userRepository.loginUser(loginData);
    }
}
