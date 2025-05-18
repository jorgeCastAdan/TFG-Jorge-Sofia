package jorge.sofia.actividades;

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

import clases.Actividad;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/santanica/actividades")
public class ActividadController {
	
	private final Logger LOG = LoggerFactory.getLogger(ActividadController.class);
	private final ActividadService servicio;
	
	public ActividadController(ActividadService servicio) {
		this.servicio = servicio;
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Actividad> getPorCodigo(@PathVariable String id){
		Actividad buscada = servicio.buscarPorCodigo(id);
		LOG.info("Se ha pedido buscar una actividad por el id {" + id + "}");
		if(buscada != null) {
			LOG.info("Se ha encontrado la actividad, devolviendola...");
			return ResponseEntity.ok(buscada);
		} else {
			LOG.warn("No se ha encontrado la actividad con id {" + id + "}");
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public ResponseEntity<List<Actividad>> getTodos(){
		List<Actividad> actividades = servicio.recuperarTodos();
		LOG.debug("Se ha solicitado listar todas las actividades.");
		if(actividades.isEmpty()) {
			LOG.warn("No se han podido devolver o no se han encontrado actividades.");
			return ResponseEntity.notFound().build();
		} else {
			LOG.info("Devolviendo una lista de las actividades...");
			return ResponseEntity.ok(actividades);
		}
	}
	
	@PostMapping("/nuevo")
	public ResponseEntity<Actividad> guardarActividad(@RequestBody Actividad nueva){
		LOG.info("Se va a guardar una nueva actividad.");
		Actividad guardar = servicio.almacenarActividad(nueva);
		LOG.info("Se ha guardado correctamente la acitividad {" + nueva.getTitulo() + "}");
		return ResponseEntity.status(HttpStatus.CREATED).body(guardar);
	}
	
	@DeleteMapping("/borrar/{borrar}")
	public ResponseEntity<Actividad> borrarActividad(@PathVariable String borrar){
		LOG.info("Se va a borrar la actividad con el codigo {" + borrar + "}");
		if(servicio.deleteActvidad(borrar)) {
			LOG.info("Se va a borrar la actividad.");
			return ResponseEntity.noContent().build();
		} else {
			LOG.warn("No se ha encontrado la actividad con ese codigo, no se borrara nada.");
			return ResponseEntity.notFound().build();
		}
		
	}
}
