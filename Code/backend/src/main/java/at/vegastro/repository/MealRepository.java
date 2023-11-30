package at.vegastro.repository;

import at.vegastro.dtos.ChangeMealStatusDto;
import at.vegastro.dtos.ChangeMealValuesDto;
import at.vegastro.model.Meal;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class MealRepository implements PanacheRepository<Meal> {

    public Meal getByTitle(String title) {
        return find("title", title).firstResult();
    }

    public Meal createMeal(Meal meal) {
        meal.active = true;
        persist(meal);
        return meal;
    }

    public Meal getMealById(Long id) {
        return findById(id);
    }

    public List<Meal> getAll() {
        return listAll();
    }

    public void changeActive(Long mealid) {
        Meal meal = findById(mealid);
        meal.active  = !meal.active;
        this.getEntityManager().merge(meal);
    }

    public void changeValues(ChangeMealValuesDto data) {
        Meal meal = findById(data.id);
        meal.description = data.description;
        meal.title = data.title;
        meal.type = data.type;
        meal.price = data.price;
        this.getEntityManager().merge(meal);
    }
}
