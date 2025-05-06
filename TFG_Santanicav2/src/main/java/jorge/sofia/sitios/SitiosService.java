package jorge.sofia.sitios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import clases.Sitios_interes;

@Service
public class SitiosService {

	@Autowired
	public SitiosRepository repositorio;
	
	public Optional<Sitios_interes> buscarPorId(String id) {
		return repositorio.findById(id);
	}
	
	public Sitios_interes buscarPorDireccion(String direccion) {
		return repositorio.findByDireccion(direccion);
	}
	
	public List<Sitios_interes> buscarTodos(){
		return (List<Sitios_interes>)repositorio.findAll();
	}
	
}
