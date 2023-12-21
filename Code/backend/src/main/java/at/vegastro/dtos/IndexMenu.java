package at.vegastro.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class IndexMenu {
    private boolean active;
    private String description;
    private String price;
    private String title;
    private String type;

    @JsonCreator
    public IndexMenu(@JsonProperty("active") boolean active,@JsonProperty("description") String description,@JsonProperty("price") String price,@JsonProperty("title") String title,@JsonProperty("type") String type) {
        this.active = active;
        this.description = description;
        this.price = price;
        this.title = title;
        this.type = type;
    }

    @JsonCreator
    public IndexMenu() {
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
