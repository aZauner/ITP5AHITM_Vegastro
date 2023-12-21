package at.vegastro.resource;

import at.vegastro.dtos.IndexLocation;
import at.vegastro.model.Meal;
import at.vegastro.model.Restaurant;
import at.vegastro.repository.RestaurantRepository;
import io.quarkus.scheduler.Scheduled;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.opensearch.client.RestClient;
import org.opensearch.client.RestClientBuilder;
import org.opensearch.client.json.UnexpectedJsonEventException;
import org.opensearch.client.json.jackson.JacksonJsonpMapper;
import org.opensearch.client.opensearch.OpenSearchClient;
import org.opensearch.client.opensearch.core.IndexRequest;
import org.opensearch.client.opensearch.core.SearchRequest;
import org.opensearch.client.opensearch.core.SearchResponse;
import org.opensearch.client.opensearch.core.search.HitsMetadata;
import org.opensearch.client.transport.OpenSearchTransport;
import org.opensearch.client.transport.rest_client.RestClientTransport;
import at.vegastro.model.IndexData;
import at.vegastro.dtos.IndexMenu;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@Path("/search")
public class SearchResource {

     public OpenSearchClient client;
     public List<Restaurant> previousRestaurants = new LinkedList<>();

     @Inject
     RestaurantRepository restaurantRepository;


    public void init() throws IOException {
        final HttpHost host = new HttpHost("localhost", 9200, "http");
        final BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        //Only for demo purposes. Don't specify your credentials in code.
        credentialsProvider.setCredentials(new AuthScope(host), new UsernamePasswordCredentials("admin", "admin"));

        //Initialize the client with SSL and TLS enabled
        final RestClient restClient = RestClient.builder(host).
                setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                    @Override
                    public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                        return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                    }
                }).build();

        final OpenSearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
        OpenSearchClient client = new org.opensearch.client.opensearch.OpenSearchClient(transport);
        this.client = client;
        System.out.println(this.client);
    }

    public void bulkData(List<Restaurant> restaurants){
        System.out.println(this.client);
        try {
            for(Restaurant restaurant: restaurants){
                List<IndexMenu> menu = new LinkedList<>();
                for (Meal meal: restaurant.menu){
                    menu.add(new IndexMenu(meal.active, meal.description, meal.price, meal.title, meal.type));
                }
                IndexData indexData = new IndexData(restaurant.longitude,restaurant.latitude ,restaurant.description, restaurant.id.toString(), new IndexLocation(restaurant.location.city, restaurant.location.plz.toString(), restaurant.location.street), restaurant.restaurantName, menu );
                IndexRequest<IndexData> indexRequest = new IndexRequest.Builder<IndexData>().index("search_index").document(indexData).build();
                this.client.index(indexRequest);
            }


        }catch (Exception e){
            System.out.println( e.getMessage());
            e.printStackTrace();
        }
    }

    //@GET
    //@Path("/indexData")
    @Scheduled(every="10s")
    public void indexData() throws IOException {
        init();
        if (previousRestaurants.size() == 0){
            previousRestaurants =  restaurantRepository.getAll();
            this.bulkData(previousRestaurants);
        }else {
            List<Restaurant> allRestaurants = new LinkedList<>();
            allRestaurants = restaurantRepository.getAll();
            List<Restaurant> restaurantsToAdd = new LinkedList<>();
            for (Restaurant element : allRestaurants) {
                if (!previousRestaurants.contains(element)) {
                    restaurantsToAdd.add(element);
                }
            }
            if (restaurantsToAdd.size() == 0){
                return;
            }else {
                this.bulkData(restaurantsToAdd);
            }
        }

    }

    @GET
    @Path("/searchResult")
    public void searchForResult()  throws IOException {
        init();
        try {
            SearchResponse<IndexData> searchResponse = client.search(s -> s.index("search_index"), IndexData.class);
            for (int i = 0; i < searchResponse.hits().hits().size(); i++) {
                System.out.println(searchResponse.hits().hits().get(i).source().getRestaurantName());
            }
        } catch (Exception e) {
            // Log detailed information about the response causing the error
            System.err.println(e.getMessage());
            e.printStackTrace();
        }
    }
}
