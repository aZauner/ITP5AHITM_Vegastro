package at.vegastro.resource;

import at.vegastro.dtos.ImageUploadForm;
import at.vegastro.model.Image;
import at.vegastro.model.JwtPayload;
import at.vegastro.repository.ImageRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.MultipartForm;

@Path("/image")
public class ImageResource {

    @Inject
    ImageRepository imageRepository;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Long uploadImage(@MultipartForm ImageUploadForm form, @HeaderParam("Authorization") String token) {
        if(JwtPayload.tokenGranted(token)) {
            Image imageEntity = new Image();
            imageEntity.imageName = form.name;
            imageEntity.imageData = form.data;
            imageEntity.persist();
            System.out.println(imageEntity.id);
            return imageEntity.id;
        }
        return null;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public byte[] getImage(@PathParam("id") Long id) {
        Image image = imageRepository.findById(id);
        return image.imageData;
    }
}
