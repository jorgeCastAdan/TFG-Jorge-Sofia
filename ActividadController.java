package jorge.sofia.actividades;

import java.util.List;
import java.util.UUID;

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

import clases.Actividad;

/**
 * Esta clase sirve para conectar la clase Actividad a la tabla de Actividades ademas de definir las rutas que va a
 * tener la API para acceder a la informacion de la tabla.
 * 
 * @author Jorge Castellanos y Sofia Ubeda
 * @version 2.1.2
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/santanica/actividades")
public class ActividadController {
	
	private final Logger LOG = LoggerFactory.getLogger(ActividadController.class);
	private final ActividadService servicio;
	
	public ActividadController(ActividadService servicio) {
		this.servicio = servicio;
	}
	
	/**
	 * Este metodo busca en la base de datos por codigo.
	 * @param id - cadena que identifica a un objeto Actividad el cual se quiere buscar
	 * @return - codigo 200 en caso de haber encontrado el objeto actividad (junto a dicho objeto) o codigo 404 en caso de no haberlo encontrado
	 */
	@GetMapping("/id/{id}")
	public ResponseEntity<Actividad> getPorCodigo(@PathVariable UUID id){
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
	
	/**
	 * Este metodo devuelve todos los objetos que se encuentren en la tabla Actividad
	 * @return - una lista de actividades que haya encontrado en la base de datos y codigo 200 o codigo 404 si no ha encontrado ninguna ocurrencia
	 */
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
	
	/**
	 * Este metodo sirve para dar de alta un objeto Actividad en la base de datos.
	 * @param nueva - objeto actividad en formato JSON que va a ser insertado en la BD.
	 * @return - objeto con la nueva instancia de actividad y un codigo de como ha ido la operacion.
	 */
	@PostMapping("/nuevo")
	public ResponseEntity<Actividad> guardarActividad(@RequestBody Actividad nueva){
		LOG.info("Se va a guardar una nueva actividad.");
		Actividad guardar = servicio.almacenarActividad(nueva);
		LOG.info("Se ha guardado correctamente la acitividad {" + nueva.getTitulo() + "}");
		return ResponseEntity.status(HttpStatus.CREATED).body(guardar);
	}
	
	/**
	 * Este metodo sirve para borrar una Actividad por su codigo.
	 * @param borrar - codigo o id que identifica a el objeto Actividad que se quiere brorar
	 * @return - codigo 204 en caso de haber borrado correctamente el objeto y 404 en caso de no haberla encontrado y no haberla podido borrar.
	 */
	@DeleteMapping("/borrar/{borrar}")
	public ResponseEntity<Actividad> borrarActividad(@PathVariable UUID borrar){
		LOG.info("Se va a borrar la actividad con el codigo {" + borrar + "}");
		if(servicio.deleteActvidad(borrar)) {
			LOG.info("Se va a borrar la actividad.");
			return ResponseEntity.noContent().build();
		} else {
			LOG.warn("No se ha encontrado la actividad con ese codigo, no se borrara nada.");
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@PutMapping("/modificar_actividad/{id}")
	public ResponseEntity<Actividad> modificarConcierto(@PathVariable UUID id, @RequestBody Actividad actividadModificado)
	{		
		Actividad actividadRecuperado = servicio.buscarPorCodigo(id);
		
		actividadRecuperado.setDescripcion(actividadModificado.getDescripcion());
		actividadRecuperado.setDireccion(actividadModificado.getDireccion());
		actividadRecuperado.setEditando(actividadModificado.isEditando());
		actividadRecuperado.setFecha(actividadModificado.getFecha());
		actividadRecuperado.setImagen(actividadModificado.getImagen());
		actividadRecuperado.setReservable(actividadModificado.isReservable());
		actividadRecuperado.setTipo(actividadModificado.getTipo());
		actividadRecuperado.setTitulo(actividadModificado.getTitulo());
		
		Actividad actividadGuardado = servicio.almacenarActividad(actividadRecuperado);
		return ResponseEntity.ok(actividadGuardado);
	}
}
