package jorge.sofia.informacion;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Informacion;

@EnableScan
public interface InformacionRepository extends CrudRepository<Informacion, String>{
	
	Informacion findByCodigo(String codigo);

}
