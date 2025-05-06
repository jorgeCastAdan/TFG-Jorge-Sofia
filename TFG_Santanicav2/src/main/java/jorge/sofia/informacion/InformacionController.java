package jorge.sofia.informacion;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clases.Informacion;
import jorge.sofia.usuarios.UsuarioController;

@RestController
@RequestMapping("/informacion")
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
		Optional<Informacion> buscado = servicio.recuperarPorId(id);
		if(buscado.isPresent()) {
			return ResponseEntity.ok(buscado.get());
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@GetMapping("/titulo/{titulo}")
	public ResponseEntity<Informacion> getPorTitulo(@PathVariable String titulo){
		Informacion buscada = servicio.recuperarPorTitulo(titulo);
		if(buscada != null) {
			return ResponseEntity.ok(buscada);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
