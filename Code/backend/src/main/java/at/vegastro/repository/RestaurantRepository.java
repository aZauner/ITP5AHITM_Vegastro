package at.vegastro.repository;


import at.vegastro.model.Location;
import at.vegastro.model.Restaurant;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class RestaurantRepository implements PanacheRepository<Restaurant> {

    @Inject
    LocationRepository locationRestaurantRepository;
    public void createRestaurant(Restaurant restaurant) {
        Location locationRestaurant = restaurant.location;
        locationRestaurantRepository.persist(locationRestaurant);
        restaurant.location = locationRestaurant;
        persist(restaurant);
    }

    public Restaurant getById(Long id){
        return findById(id);
    }

    public List<Restaurant> findRestaurantsNearPosition(Double northLat, Double northLon, Double southLat, Double southLon) {
        Map<String,Double> params = new HashMap<>();
        params.put("northLat", northLat);
        params.put("northLon", northLon);
        params.put("southLat", southLat);
        params.put("southLon", southLon);
        return list("longitude < :northLon and longitude > :southLon and latitude < :northLat and latitude > :southLat", params);
    }
}
