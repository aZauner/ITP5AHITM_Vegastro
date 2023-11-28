package at.vegastro.repository;


import at.vegastro.model.Location;
import at.vegastro.model.Meal;
import at.vegastro.model.Restaurant;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.TypedQuery;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class RestaurantRepository implements PanacheRepository<Restaurant> {

    @Inject
    LocationRepository locationRestaurantRepository;
    @Inject
    MealRepository mealRepository;
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
        TypedQuery<Restaurant> query = getEntityManager().createQuery(
                "select r from Restaurant r where r.latitude < :northLat and r.latitude > :southLat and r.longitude < :northLon and r.longitude > : southLon", Restaurant.class
        );
        query.setParameter("northLat", northLat);
        query.setParameter("northLon", northLon);
        query.setParameter("southLat", southLat);
        query.setParameter("southLon", southLon);
        return query.getResultList();
    }

    public List<Restaurant> getAll() {
        return listAll();
    }

    public void addMealToMenu(Long mealid, Long restaurantid) {
        Restaurant restaurant = findById(restaurantid);
        Meal meal = this.mealRepository.getMealById(mealid);
        restaurant.menu.add(meal);
        this.getEntityManager().merge(restaurant);
    }
}
