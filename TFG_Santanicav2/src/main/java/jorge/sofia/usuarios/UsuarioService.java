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
	
	public Usuario buscarPorEmail(String email) {
		return repositorio.findByEmail(email);
	}
	
	public List<Usuario> getTodos(){
		return (List<Usuario>) repositorio.findAll();
	}
}
