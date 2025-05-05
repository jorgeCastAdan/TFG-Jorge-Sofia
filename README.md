# TFG-Jorge-Sofia

### Para poder hacer peticiones con distintos puertos en los servicios. 
#### Opción 1: Configuración global
Puedes permitir CORS globalmente en tu aplicación configurando un CorsMapping en tu clase de configuración.

java
Copiar
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//investigar si nos sale rentable hacer una clase de configuración o si podemos buscar y editar la que tenga SPring por defecto :D
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permitir todas las rutas
                .allowedOrigins("http://localhost:4200") // Origen permitido
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Cabeceras permitidas
                .allowCredentials(true); // Si necesitas permitir credenciales
    }
}

#### Opción 2, poner esta cabecera en cada método del controlador de la API (en backend//spring)
@CrossOrigin(origins = "http://localhost:4200")

### Veremos a ver si podemos publicar nuestra web con esto
https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/local-management/create-local-tunnel/

### Redirigir la pagina a otra pagina web
window.location.href = path;
