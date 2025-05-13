package jorge.sofia.informacion;

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

import clases.Informacion;
import jorge.sofia.usuarios.UsuarioController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/santanica/informacion")
public class InformacionController {
	
	private final Logger LOG = LoggerFactory.getLogger(UsuarioController.class);
	private final InformacionService servicio;
	
	public InformacionController(InformacionService servicio) {
		this.servicio = servicio;
	}
	
	@GetMapping
	public ResponseEntity<List<Informacion>> getTodos(){
		List<Informacion> buscadas = servicio.recuperarTodos();
		LOG.debug("Se han solicitado una lista de los objetos informacion");
		if(buscadas.isEmpty()) {
			LOG.warn("No se han podido recuperar o la tabla esta vacia");
			return ResponseEntity.notFound().build();
		} else {
			LOG.info("Informacion recuperada correctamente, devolviendolas...");
			return ResponseEntity.ok(buscadas);
		}
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Informacion> getPorId(@PathVariable String id){
		Informacion buscado = servicio.recuperarPorCodigo(id);
		if(buscado != null) {
			return ResponseEntity.ok(buscado);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/nuevo")
	public ResponseEntity<Informacion> almacenarInformacion(@RequestBody Informacion info){
		Informacion nueva = servicio.guardarInformacion(info);
		return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
	}

	@DeleteMapping("/borrar/{borrar}")
	public ResponseEntity<Informacion> borrarInformacion(@PathVariable String borrar){
		LOG.info("Se va a borrar la informacion con el codigo {" + borrar + "}");
		if(servicio.deleteInformacion(borrar)) {
			LOG.info("Se ha borrado con exito la informacion.");
			return ResponseEntity.noContent().build();
		} else {
			LOG.warn("No se ha encontrado la informacion con ese codigo, no se borrara nada.");
			return ResponseEntity.notFound().build();
		}
		
	}
	
}
