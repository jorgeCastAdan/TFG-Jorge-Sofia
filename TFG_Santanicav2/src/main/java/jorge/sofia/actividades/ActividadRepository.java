package jorge.sofia.actividades;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import clases.Actividad;

@EnableScan
public interface ActividadRepository extends CrudRepository<Actividad, String>{
	
	Actividad findByCodigo(String codigo);
	
}
