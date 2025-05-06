package jorge.sofia.sitios;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clases.Sitios_interes;

@RestController
@RequestMapping("/sitios")
public class SitiosController {
	private final Logger LOG = LoggerFactory.getLogger(SitiosController.class);
	private final SitiosService servicio;
	
	public SitiosController(SitiosService servicio) {
		this.servicio = servicio;
	}
	
	@GetMapping
	public ResponseEntity<List<Sitios_interes>> getTodos(){
		LOG.info("Se van a recuperar todos los usuarios");
		List<Sitios_interes> sitios = servicio.buscarTodos();
		if(sitios.isEmpty()) {
			LOG.error("No se han podido recuperar los usuarios");
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(sitios);
		}
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Sitios_interes> getPorId(@PathVariable String id){
		Optional<Sitios_interes> buscado = servicio.buscarPorId(id);
		if(buscado.isPresent()) {
			return ResponseEntity.ok(buscado.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/direccion/{direccion}")
	public ResponseEntity<Sitios_interes> getPorDireccion(@PathVariable String direccion){
		Sitios_interes buscado = servicio.buscarPorDireccion(direccion);
		if(buscado != null) {
			return ResponseEntity.ok(buscado);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
