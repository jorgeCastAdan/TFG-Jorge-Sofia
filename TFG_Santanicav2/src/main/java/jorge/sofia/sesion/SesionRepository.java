package jorge.sofia.sesion;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Sesion;

@EnableScan
public interface SesionRepository extends CrudRepository<Sesion, String>{

	Sesion findByToken(String token);
}
