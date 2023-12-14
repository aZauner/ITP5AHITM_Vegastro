package at.vegastro.resource;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/search")
public class SearchResource {



    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public String test() {
        return "edsf";
    }
}
