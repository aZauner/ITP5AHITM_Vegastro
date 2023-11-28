package at.vegastro.resource;

import at.vegastro.dtos.ImageUploadForm;
import at.vegastro.model.Image;
import at.vegastro.repository.ImageRepository;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.util.Optional;

@Path("/image")
public class ImageResource {

    @Inject
    ImageRepository imageRepository;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response uploadImage(
            @MultipartForm ImageUploadForm form) {
        Image imageEntity = new Image();
        imageEntity.imageName = form.name;
        imageEntity.imageData = form.data;

        imageEntity.persist();

        return Response.ok("Image uploaded successfully").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public byte[] getImage(@PathParam("id") Long id) {
        Image image = imageRepository.findById(id);
        return image.imageData;
    }
}
