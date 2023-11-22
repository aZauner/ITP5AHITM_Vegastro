package at.vegastro.repository;

import at.vegastro.model.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.bouncycastle.util.encoders.Hex;

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
            e.printStackTrace();
        }
    }
}
