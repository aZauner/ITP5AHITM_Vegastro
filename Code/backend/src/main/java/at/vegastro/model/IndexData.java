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
    private Double latitude;
    private Double longitude;

    private String type;

    private Long image;

    @JsonCreator
    public IndexData(@JsonProperty("longitude") Double longitude,@JsonProperty("latitude") Double latitude,@JsonProperty("description") String description,@JsonProperty("id") String id,@JsonProperty("location") IndexLocation location,@JsonProperty("restaurantName") String restaurantName,@JsonProperty("menu") List<IndexMenu> menu, @JsonProperty("type") String type, @JsonProperty("image") Long image) {
        this.description = description;
        this.id = id;
        this.location = location;
        this.restaurantName = restaurantName;
        this.menu = menu;
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
        this.image = image;
    }

    @JsonCreator
    public IndexData() {
    }

    public Long getImage() {
        return image;
    }

    public void setImage(Long image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
