package at.vegastro.repository;

import at.vegastro.model.Meal;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MealRepository implements PanacheRepository<Meal> {

    public Meal getByTitle(String title) {
        return find("title", title).firstResult();
    }

    public void createRestaurant(Meal meal) {
        persist(meal);
    }

    public Meal getMealById(Long id) {
        return findById(id);
    }
}
