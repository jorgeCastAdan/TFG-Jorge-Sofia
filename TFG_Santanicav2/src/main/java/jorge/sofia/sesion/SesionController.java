package jorge.sofia.sesion;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clases.Sesion;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/santanica/sesion")
public class SesionController {
	
	private final Logger LOG = LoggerFactory.getLogger(SesionController.class);
	private final SesionService servicio;
	
	public SesionController(SesionService servicio) {
		this.servicio = servicio;
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Sesion> getPorToken(@PathVariable String id){
		Sesion buscada = servicio.getPorToken(id);
		LOG.info("Se ha pedido buscar una sesion por el id {" + id + "}");
		if(buscada != null) {
			LOG.info("Se ha encontrado la sesion, devolviendola...");
			return ResponseEntity.ok(buscada);
		} else {
			LOG.warn("No se ha encontrado la sesion con id {" + id + "}");
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public ResponseEntity<List<Sesion>> getTodos(){
		List<Sesion> actividades = servicio.recuperarTodos();
		LOG.debug("Se ha solicitado listar todas las sesion.");
		if(actividades.isEmpty()) {
			LOG.warn("No se han podido devolver o no se han encontrado sesion.");
			return ResponseEntity.notFound().build();
		} else {
			LOG.info("Devolviendo una lista de las sesion...");
			return ResponseEntity.ok(actividades);
		}
	}
	
	@PostMapping("/nuevo")
	public ResponseEntity<Sesion> guardarSesion(@RequestBody Sesion nueva){
		LOG.info("Se va a almacenar una nueva sesion. {" + nueva.toString() + "}");
		Sesion guardar = servicio.guardarSesion(nueva);
		LOG.info("Se ha guardado correctamente la sesion.");
		return ResponseEntity.status(HttpStatus.CREATED).body(guardar);
	}
	
	@DeleteMapping("/borrar/{borrar}")
	public ResponseEntity<Sesion> borrarSesion(@PathVariable String borrar){
		LOG.info("Se va a borrar la sesion con el token {" + borrar + "}");
		if(servicio.deleteSesion(borrar)) {
			LOG.info("Se ha borrado correctamente el token.");
			return ResponseEntity.noContent().build();
		} else {
			LOG.warn("No se ha encontrado el token, no se borrara nada.");
			return ResponseEntity.notFound().build();
		}
		
	}
	
}
