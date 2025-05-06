package jorge.sofia.usuarios;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Usuario;

@EnableScan
public interface UsuarioRepository extends CrudRepository<Usuario, String>{
	
	public Usuario findByDNI(String dni);
	public Usuario findByEmail(String email);
	
	
}
