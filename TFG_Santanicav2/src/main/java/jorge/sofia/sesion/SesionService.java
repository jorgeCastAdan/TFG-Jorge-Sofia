package jorge.sofia.sesion;

import java.util.List;

import org.springframework.stereotype.Service;

import clases.Sesion;

@Service
public class SesionService {
	
	private final SesionRepository repositorio;
	
	public SesionService (SesionRepository repositorio) {
		this.repositorio = repositorio;
	}
	
	public Sesion getPorToken(String token) {
		return repositorio.findByToken(token);
	}
	
	public List<Sesion> recuperarTodos() {
		return (List<Sesion>) repositorio.findAll();
	}
	
	public Sesion guardarSesion(Sesion info) {
		return repositorio.save(info);
	}
	
	public boolean deleteSesion (String token) {
		Sesion s = this.getPorToken(token);
		if(s != null) {
			repositorio.delete(s);
			return true;
		} else {
			return false;
		}
			
	}
	
}
