package at.vegastro.repository;

import at.vegastro.dtos.ChangeMealStatusDto;
import at.vegastro.model.Meal;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

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

    public List<Meal> getAll() {
        return listAll();
    }

    public void chnageActive(Long mealid) {
        Meal meal = findById(mealid);
        meal.active  = !meal.active;
        this.getEntityManager().merge(meal);
    }
}
