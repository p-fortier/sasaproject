import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

import java.util.Map;

public class MainVerticle extends AbstractVerticle {


    public void start() {
        Router router = Router.router(vertx);

        router.route().handler(BodyHandler.create());
        router.get("/me").handler(this::getHeaders);

        vertx.createHttpServer().requestHandler(router::accept).listen(8080);
    }


    private void putFingerprint(RoutingContext context){

    }

    private void compareFingerprint(RoutingContext context){

    }

    private void getHeaders(RoutingContext context) {
        JsonObject result = new JsonObject();
        for (Map.Entry<String, String> entry : context.request().headers()) {
            result.put(entry.getKey(),entry.getValue());
        }

        context.response().putHeader("content-type","application/json").end(result.encodePrettily());
    }
}
