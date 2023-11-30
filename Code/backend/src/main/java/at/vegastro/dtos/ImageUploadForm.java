package at.vegastro.dtos;

import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.ws.rs.FormParam;

@RegisterForReflection // Required for reflection in native mode
public class ImageUploadForm {

    @FormParam("file")
    public byte[] data;

    @FormParam("name")
    public String name;

}