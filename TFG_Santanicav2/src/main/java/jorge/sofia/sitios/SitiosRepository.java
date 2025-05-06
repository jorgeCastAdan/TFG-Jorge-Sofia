package jorge.sofia.sitios;

import java.util.Optional;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Sitios_interes;

@EnableScan
public interface SitiosRepository extends CrudRepository<Sitios_interes, String>{
	
	public Optional<Sitios_interes> findById(String id);
	public Sitios_interes findByDireccion(String id);	
	
}
