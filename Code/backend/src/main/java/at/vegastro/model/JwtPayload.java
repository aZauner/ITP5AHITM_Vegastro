package at.vegastro.model;

import com.google.gson.Gson;

import java.util.Base64;
import java.util.List;
import java.util.Map;

public class JwtPayload {
    private Map<String, RolesHead> resource_access;

    public JwtPayload(Map<String, RolesHead> resource_access) {
        this.resource_access = resource_access;
    }

    public JwtPayload() {
    }

    public Map<String, RolesHead> getResource_access() {
        return resource_access;
    }

    public void setResource_access(Map<String, RolesHead> resource_access) {
        this.resource_access = resource_access;
    }

    public static Boolean tokenGranted(String token) {
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        Gson g = new Gson();
        JwtPayload jwtPayload = g.fromJson(payload, JwtPayload.class);
        return jwtPayload.getResource_access().get("vegastro").getRoles().get(0) == "admin_role";
    }
}

