package jorge.sofia.sitios;

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

import clases.Sitios_interes;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/santanica/sitios")
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
	
	@GetMapping("/id/{codigo}")
	public ResponseEntity<Sitios_interes> getPorCodigo(@PathVariable String codigo){
		Sitios_interes buscado = servicio.buscarPorCodigo(codigo);
		if(buscado != null) {
			return ResponseEntity.ok(buscado);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/nuevo")
	public ResponseEntity<Sitios_interes> guardarSitios(@RequestBody Sitios_interes nuevo){
		Sitios_interes guardar = servicio.alamcenarSitios(nuevo);
		return ResponseEntity.status(HttpStatus.CREATED).body(guardar);
	}
	
	@DeleteMapping("/borrar/{borrar}")
	public ResponseEntity<Sitios_interes> borrarSitios(@PathVariable String borrar){
		LOG.info("Se va a borrar el sitio con el codigo {" + borrar + "}");
		if(servicio.deleteSitios(borrar)) {
			LOG.info("Se ha borrado con exito el sitio de interes.");
			return ResponseEntity.noContent().build();
		} else {
			LOG.warn("No se ha encontrado el sitio con ese codigo, no se borrara nada.");
			return ResponseEntity.notFound().build();
		}
		
	}
	
}
