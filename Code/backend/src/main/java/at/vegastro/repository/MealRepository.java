package at.vegastro.repository;

import at.vegastro.model.Meal;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MealRepository implements PanacheRepository<Meal> {
    public String getString() {
        return "test";
    }
}
