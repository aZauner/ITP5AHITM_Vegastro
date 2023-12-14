package at.vegastro.model;

import at.vegastro.dtos.IndexLocation;
import at.vegastro.dtos.IndexMenu;

import java.awt.*;

public class IndexData {
    private String description;
    private String  id;
    private IndexLocation location;
    private String  restaurantName;
    private IndexMenu menu;

    public IndexData(String description, String id, IndexLocation location, String restaurantName, IndexMenu menu) {
        this.description = description;
        this.id = id;
        this.location = location;
        this.restaurantName = restaurantName;
        this.menu = menu;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public IndexLocation getLocation() {
        return location;
    }

    public void setLocation(IndexLocation location) {
        this.location = location;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public IndexMenu getMenu() {
        return menu;
    }

    public void setMenu(IndexMenu menu) {
        this.menu = menu;
    }
}
