package jorge.sofia.informacion;

import java.util.List;

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
	
	public Informacion recuperarPorCodigo(String codigo){
		return repositorio.findByCodigo(codigo);
	}
	
	public Informacion guardarInformacion(Informacion info) {
		return repositorio.save(info);
	}

	public boolean deleteInformacion (String codigo) {
		Informacion a = this.recuperarPorCodigo(codigo);
		if(a != null) {
			repositorio.delete(a);
			return true;
		} else {
			return false;
		}
			
	}
	
}
