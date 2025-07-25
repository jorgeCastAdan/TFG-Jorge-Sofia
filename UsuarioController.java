package jorge.sofia.usuarios;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clases.Usuario;

/**
* Esta clase sirve para conectar la clase Usuarios a la tabla de Usuario ademas de definir las rutas que va a
* tener la API para acceder a la informacion de la tabla.
* 
* 
 * @author Jorge Castellanos y Sofia Ubeda
 * @version 1.4
*/

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/santanica/usuarios")
public class UsuarioController {
	private final Logger LOG = LoggerFactory.getLogger(UsuarioController.class);
	private final UsuarioService servicio;
	
	public UsuarioController(UsuarioService servicio) {
		this.servicio = servicio;
	}
	
	/**
	 * Este metodo busca en la base de datos por email.
	 * @param id - cadena que identifica a un objeto Usuario el cual se quiere buscar
	 * @return - codigo 200 en caso de haber encontrado el objeto sitio (junto a dicho objeto) o codigo 404 en caso de no haberlo encontrado
	 */	
	@GetMapping("/email/{email}")
	public ResponseEntity<Usuario> getUsuEmail(@PathVariable String email) {
		Usuario buscado = servicio.buscarPorEmail(email);
		LOG.info("Se ha hecho una peticion de usuario por el email, {" + email + "}");
		if(buscado != null) {
			LOG.info("Se ha encontrado usuario, devolviendolo...");
			return ResponseEntity.ok(buscado);
		} else {
			LOG.warn("No se ha encontrado el usuario.");
			return ResponseEntity.notFound().build();
		}
		
	}
	
	/**
	 * Este metodo devuelve todos los objetos que se encuentren en la tabla Usuarios
	 * @return - una lista de usuarios que haya encontrado en la base de datos y codigo 200 o codigo 404 si no ha encontrado ninguna ocurrencia
	 */
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
	
	/**
	 * Este metodo sirve para dar de alta un objeto Usuarios en la base de datos.
	 * @param nueva - objeto usuario en formato JSON que va a ser insertado en la BD.
	 * @return - objeto con la nueva instancia de usuario y un codigo de como ha ido la operacion.
	 */
	@PostMapping("/nuevo")
	public ResponseEntity<Usuario> guardarUsuario(@RequestBody Usuario usuNuevo){
		LOG.info("Se va a guardar un usuario");
		Usuario guardar = servicio.alamacenarUsuario(usuNuevo);
		LOG.info("Se ha podido guardar con exito el usuario {" + usuNuevo.toString() + "}");
		return ResponseEntity.status(HttpStatus.CREATED).body(guardar);
	}
	
	/**
	 * Este metodo sirve para borrar un Usuario por su codigo.
	 * @param borrar - email que identifica a el objeto Usuario que se quiere brorar
	 * @return - codigo 204 en caso de haber borrado correctamente el objeto y 404 en caso de no haberla encontrado y no haberla podido borrar.
	 */
	@DeleteMapping("/borrar/{borrar}")
	public ResponseEntity<Usuario> borrarSesion(@PathVariable String borrar){
		LOG.info("Se va a borrar el usuario con el email {" + borrar + "}");
		if(servicio.deleteUsuario(borrar)) {
			LOG.info("Se ha encontrado el usuario, se procede a borrarlo.");
			return ResponseEntity.noContent().build();
		} else {
			LOG.warn("No se ha encontrado el usuario, no se borrara nada.");
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@PutMapping("/modificar_usuario/{email}")
	public ResponseEntity<Usuario> modificarConcierto(@PathVariable String email, @RequestBody Usuario usuarioModificado)
	{		
		Usuario usuarioRecuperado = servicio.buscarPorEmail(email);
		
		
		usuarioRecuperado.setApellidos(usuarioModificado.getApellidos());
		usuarioRecuperado.setCalle(usuarioModificado.getCalle());
		usuarioRecuperado.setContrasena(usuarioModificado.getContrasena());
		usuarioRecuperado.setDNI(usuarioModificado.getDNI());
		usuarioRecuperado.setEsAdmin(usuarioModificado.isEsAdmin());
		usuarioRecuperado.setFechaNac(usuarioModificado.getFechaNac());
		usuarioRecuperado.setNombre(usuarioModificado.getNombre());
		usuarioRecuperado.setPagado(usuarioModificado.isPagado());
		usuarioRecuperado.setTelefono(usuarioModificado.getTelefono());
		
		Usuario usuarioGuardado = servicio.alamacenarUsuario(usuarioRecuperado);
		return ResponseEntity.ok(usuarioGuardado);
	}
	
}
