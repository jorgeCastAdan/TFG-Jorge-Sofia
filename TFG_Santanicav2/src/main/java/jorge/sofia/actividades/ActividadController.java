package jorge.sofia.actividades;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clases.Actividad;
import jorge.sofia.usuarios.UsuarioController;

@RestController
@RequestMapping("/actividades")
public class ActividadController {
	
	private final Logger LOG = LoggerFactory.getLogger(UsuarioController.class);
	private final ActividadService servicio;
	
	public ActividadController(ActividadService servicio) {
		this.servicio = servicio;
	}
	
	@GetMapping("/titulo/{titulo}")
	public ResponseEntity<Actividad> getPorTitulo(@PathVariable String titulo){
		Actividad buscada = servicio.buscarPorTitulo(titulo);
		LOG.info("Se ha pedido buscar una actividad por el titulo {" + titulo + "}");
		if(buscada != null) {
			LOG.info("Se ha encontrado la actividad, devolviendola...");
			return ResponseEntity.ok(buscada);
		} else {
			LOG.warn("No se ha encontrado la actividad con titulo {" + titulo + "}");
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/codigo/{id}")
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
}
