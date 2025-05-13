package jorge.sofia.usuarios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import clases.Usuario;

@Service
public class UsuarioService {
	
	@Autowired
	public UsuarioRepository repositorio;
	
	public Usuario buscarPorDNI(String dni) {
		return repositorio.findByDNI(dni);
	}
	
	public List<Usuario> getTodos(){
		return (List<Usuario>) repositorio.findAll();
	}
	
	public Usuario alamacenarUsuario(Usuario u) {
		return repositorio.save(u);
	}
	
	public boolean deleteUsuario (String DNI) {
		Usuario u = this.buscarPorDNI(DNI);
		if(u != null) {
			repositorio.delete(u);
			return true;
		} else {
			return false;
		}
			
	}
	
}
