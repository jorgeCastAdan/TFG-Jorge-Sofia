package jorge.sofia;

import java.util.List;
import java.util.Optional;

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
	
	public Optional<Usuario> buscarPorId(String id) {
		return repositorio.findById(id);
	}
	
	public List<Usuario> getTodos(){
		return (List<Usuario>) repositorio.findAll();
	}
}
