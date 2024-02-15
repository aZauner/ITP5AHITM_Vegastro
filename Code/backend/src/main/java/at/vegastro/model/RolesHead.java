package at.vegastro.model;

import java.util.List;

public class RolesHead {
    private List<String> roles;

    public RolesHead(List<String> roles) {
        this.roles = roles;
    }

    public RolesHead() {
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
