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
	
	public Actividad buscarPorTitulo(String titulo) {
		return repositorio.findByTitulo(titulo);
	}
	
	public List<Actividad> recuperarTodos(){
		return (List<Actividad>)repositorio.findAll();
	}
	
}
