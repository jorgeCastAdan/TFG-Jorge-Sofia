package jorge.sofia.sitios;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Sitios_interes;

@EnableScan
public interface SitiosRepository extends CrudRepository<Sitios_interes, String>{
	
	public Sitios_interes findByCodigo(String codigo);
	
}
