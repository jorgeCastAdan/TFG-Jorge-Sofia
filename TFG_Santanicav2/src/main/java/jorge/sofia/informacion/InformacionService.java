package jorge.sofia.informacion;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import clases.Informacion;

@Service
public class InformacionService {
	
	private final InformacionRepository repositorio;
	
	public InformacionService(InformacionRepository repositorio) {
		this.repositorio = repositorio;
	}
	
	public List<Informacion> recuperarTodos() {
		return (List<Informacion>) repositorio.findAll();
	}
	
	public Informacion recuperarPorTitulo (String titulo) {
		return repositorio.findByTitulo(titulo);
	}
	
	public Optional<Informacion> recuperarPorId(String id){
		return repositorio.findById(id);
	}

}
