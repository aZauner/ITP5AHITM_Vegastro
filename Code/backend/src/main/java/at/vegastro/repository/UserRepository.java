package at.vegastro.repository;

import at.vegastro.dtos.FavouriteRestaurantDto;
import at.vegastro.dtos.LoginUserDto;
import at.vegastro.dtos.UpdateUserDto;
import at.vegastro.model.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bouncycastle.util.encoders.Hex;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
    @Inject
    RestaurantRepository restaurantRepository;

    public void createUser(User user)  {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(
                    user.password.getBytes(StandardCharsets.UTF_8));
            String hashedPassword = new String(Hex.encode(hash));
            user.password= hashedPassword;
            persist(user);
        }catch (Exception e){
        }
    }

    public Long loginUser(LoginUserDto loginData) {
        User user = find("email", loginData.email).firstResult();

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(
                    loginData.password.getBytes(StandardCharsets.UTF_8));
            String hashedPassword = new String(Hex.encode(hash));

            if (user.password.equals(hashedPassword)){
                return user.id;
            }else {
                return null;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    
    public void addFavourite(FavouriteRestaurantDto data) {
        User user = findById(data.user_id);
        user.favouriteRestaurants.add(restaurantRepository.findById(data.restaurant_id));
        this.getEntityManager().merge(user);
    }

    public void removeFavourite(FavouriteRestaurantDto data) {
        User user = findById(data.user_id);
        user.favouriteRestaurants.remove(restaurantRepository.findById(data.restaurant_id));
        this.getEntityManager().merge(user);
    }

    public String updateUser(UpdateUserDto data) {
        User user = findById(data.id);
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(
                    data.oldPassword.getBytes(StandardCharsets.UTF_8));
            String oldPwd = new String(Hex.encode(hash));
            System.out.println("UserPwd: " + user.password);
            System.out.println("FrontendPwd: " + oldPwd);
            System.out.println();
            if (user.password.equals(oldPwd)){
                byte[] hash1 = digest.digest(
                        data.newPassword.getBytes(StandardCharsets.UTF_8));
                hash = digest.digest(
                        data.confirmedPassword.getBytes(StandardCharsets.UTF_8));
                String comfirmedPwd = new String(Hex.encode(hash));
                String newPwd = new String(Hex.encode(hash1));
                if(oldPwd.equals(newPwd)) {
                    return "Neues und altes Passwort sind gleich!";
                }

                if(newPwd.equals(comfirmedPwd)) {
                    user.password = comfirmedPwd;
                    this.getEntityManager().merge(user);
                    return null;
                } else {
                    return "Neues Passwort stimmt nicht überein!";
                }
            }else {
                return "Altes Passwort stimmt nicht überein!";
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
