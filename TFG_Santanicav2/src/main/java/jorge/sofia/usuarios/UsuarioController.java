package jorge.sofia.usuarios;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clases.Usuario;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	private final Logger LOG = LoggerFactory.getLogger(UsuarioController.class);
	private final UsuarioService servicio;
	
	public UsuarioController(UsuarioService servicio) {
		this.servicio = servicio;
	}
	
	@GetMapping("/dni/{dni}")
	public ResponseEntity<Usuario> getUsuDNI(@PathVariable String dni) {
		Usuario buscado = servicio.buscarPorDNI(dni);
		LOG.info("Se ha hecho una peticion de usuario por el DNI");
		if(buscado != null) {
			LOG.info("Se ha encontrado usuario, devolviendolo...");
			return ResponseEntity.ok(buscado);
		} else {
			LOG.warn("No se ha encontrado el usuario.");
			return ResponseEntity.notFound().build();
		}
		
	}
	@GetMapping("/email/{email}")
	public ResponseEntity<Usuario> getUsuId(@PathVariable String email){
		LOG.info("Se ha recibido el id {" + email + "}");
		Usuario buscado = servicio.buscarPorEmail(email);
		LOG.info("Se ha solicitado un usuario por su id");
		if(buscado != null) {
			LOG.info("Se ha encontrado el usuario, devolviendolo...");
			return ResponseEntity.ok(buscado);
		} else {
			LOG.warn("No se ha encontrado el usuario");
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public ResponseEntity<List<Usuario>> getTodos(){
		LOG.info("Se van a recuperar todos los usuarios");
		List<Usuario> usuarios = servicio.getTodos();
		if(usuarios.isEmpty()) {
			LOG.error("No se han podido recuperar los usuarios");
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(usuarios);
		}
	}

}
