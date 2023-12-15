package at.vegastro.resource;

import at.vegastro.dtos.IndexLocation;
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

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public void test() throws IOException {
        System.setProperty("javax.net.ssl.trustStore", "src/main/resources/server.keystore");
        System.setProperty("javax.net.ssl.trustStorePassword", "password");

        final HttpHost host = new HttpHost("https", 443, "357c-193-170-158-243.ngrok.io/");
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

    @GET
    @Path("/indexData")
    public void indexData() throws IOException {
        System.out.println(this.client);
        List<IndexMenu> menu = new LinkedList<>();
        menu.add(new IndexMenu(true, "asdf", "asfd", "asdf", "asdf"));
        IndexData indexData = new IndexData("asdf", "asdf", new IndexLocation("asdf", "asdf", "hsldöf"), "asdf", menu );
        IndexRequest<IndexData> indexRequest = new IndexRequest.Builder<IndexData>().index("search_index").document(indexData).build();
        this.client.index(indexRequest);
    }

    @GET
    @Path("/searchResult")
    public void searchForResult() throws IOException {
        SearchResponse<IndexData> searchResponse = client.search(s -> s.index("search_index"), IndexData.class);
        for (int i = 0; i< searchResponse.hits().hits().size(); i++) {
            System.out.println(searchResponse.hits().hits().get(i).source());
        }
    }
}
