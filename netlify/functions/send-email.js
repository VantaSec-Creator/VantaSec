import java.io.File;
import com.mashape.unirest.http.HttpResponse; // unirest v1.4.9
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
public class MGSamples {
  public static JsonNode sendSimpleMessage() throws UnirestException {
    String apiKey = System.getenv("API_KEY");
        if (apiKey == null) {
            apiKey = "API_KEY";
        }

    HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/or1g.com.br/messages")
      .basicAuth("api", apiKey)
      .queryString("from", "Mailgun Sandbox <postmaster@or1g.com.br>")
      .queryString("to", "Felipe Leopoldo <diretoria.ti@or1g.com.br>")
      .queryString("subject", "Hello Felipe Leopoldo")
      .queryString("text", "Congratulations Felipe Leopoldo, you just sent an email with Mailgun! You are truly awesome!")
      .asJson();
    return request.getBody();
  }
