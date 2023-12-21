package at.vegastro.model;

import at.vegastro.dtos.IndexLocation;
import at.vegastro.dtos.IndexMenu;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.awt.*;
import java.lang.reflect.Array;
import java.util.List;

public class IndexData {
    private String description;
    private String  id;
    private IndexLocation location;
    private String  restaurantName;
    private List<IndexMenu> menu;

    @JsonCreator
    public IndexData(@JsonProperty("description") String description,@JsonProperty("id") String id,@JsonProperty("location") IndexLocation location,@JsonProperty("restaurantName") String restaurantName,@JsonProperty("menu") List<IndexMenu> menu) {
        this.description = description;
        this.id = id;
        this.location = location;
        this.restaurantName = restaurantName;
        this.menu = menu;
    }

    @JsonCreator
    public IndexData() {
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


    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public IndexLocation getLocation() {
        return location;
    }

    public void setLocation(IndexLocation location) {
        this.location = location;
    }

    public List<IndexMenu> getMenu() {
        return menu;
    }

    public void setMenu(List<IndexMenu> menu) {
        this.menu = menu;
    }
}
