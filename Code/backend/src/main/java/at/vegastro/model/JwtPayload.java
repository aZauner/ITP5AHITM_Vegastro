package at.vegastro.model;

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
}

