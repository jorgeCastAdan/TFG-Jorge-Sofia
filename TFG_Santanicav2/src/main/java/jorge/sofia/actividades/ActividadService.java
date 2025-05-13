package jorge.sofia.actividades;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import clases.Actividad;

@Service
public class ActividadService {
	
	@Autowired
	private ActividadRepository repositorio;
	
	public Actividad buscarPorCodigo(String cod){
		return repositorio.findByCodigo(cod);
	}
	
	public List<Actividad> recuperarTodos(){
		return (List<Actividad>)repositorio.findAll();
	}
	
	public Actividad almacenarActividad(Actividad a) {
		return repositorio.save(a);
	}
	
	public boolean deleteActvidad (String codigo) {
		Actividad a = this.buscarPorCodigo(codigo);
		if(a != null) {
			repositorio.delete(a);
			return true;
		} else {
			return false;
		}
			
	}
	
}
