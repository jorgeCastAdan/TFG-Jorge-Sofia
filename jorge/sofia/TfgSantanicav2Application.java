package jorge.sofia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import config.ConfiguracionPropiedades;

@EnableConfigurationProperties({ConfiguracionPropiedades.class})
@SpringBootApplication
public class TfgSantanicav2Application {

	public static void main(String[] args) {
		SpringApplication.run(TfgSantanicav2Application.class, args);
	}

}
