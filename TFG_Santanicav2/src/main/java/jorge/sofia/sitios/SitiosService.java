package jorge.sofia.sitios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import clases.Sitios_interes;

@Service
public class SitiosService {

	@Autowired
	public SitiosRepository repositorio;
	
	public Sitios_interes buscarPorCodigo(String codigo) {
		return repositorio.findByCodigo(codigo);
	}
	
	public List<Sitios_interes> buscarTodos(){
		return (List<Sitios_interes>)repositorio.findAll();
	}
	
	public Sitios_interes alamcenarSitios(Sitios_interes nuevo) {
		return repositorio.save(nuevo);
	}
	
	public boolean deleteSitios (String codigo) {
		Sitios_interes s = this.buscarPorCodigo(codigo);
		if(s != null) {
			repositorio.delete(s);
			return true;
		} else {
			return false;
		}
			
	}
	
}
