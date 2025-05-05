package jorge.sofia;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Usuario;

@EnableScan
public interface UsuarioRepository extends CrudRepository<Usuario, String>{
	
	Usuario findByDNI(String dni);
	Usuario findByEmail(String email);
	
	
}
