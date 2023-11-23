package at.vegastro.repository;

import at.vegastro.dtos.LoginUserDto;
import at.vegastro.model.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bouncycastle.util.encoders.Hex;
import org.jboss.resteasy.reactive.RestResponse;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
    public void createUser(User user)  {
        System.out.println("create user");
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
        System.out.println(loginData.email);
        User user = find("email", loginData.email).firstResult();
        System.out.println(user.username);

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(
                    loginData.password.getBytes(StandardCharsets.UTF_8));
            String hashedPassword = new String(Hex.encode(hash));


            if (user.password.equals(hashedPassword)){
                System.out.println(user.id);
                return user.id;
            }else {
                return null;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
