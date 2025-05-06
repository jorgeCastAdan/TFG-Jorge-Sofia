package clases;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBTable(tableName = "Sitios_interesv2")
public class Sitios_interes {
	
	private String id;
	private String direccion;
	private String img;
	private String informacion;
	private String latitud;
	private String longitud;
	private String telefono;
	private String valoracion;
	
	@DynamoDBHashKey(attributeName = "id")
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	@DynamoDBAttribute(attributeName = "direccion")
	public String getDireccion() {
		return direccion;
	}
	
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	
	@DynamoDBAttribute(attributeName = "img")
	public String getImg() {
		return img;
	}
	
	public void setImg(String img) {
		this.img = img;
	}
	
	@DynamoDBAttribute (attributeName = "informacion")
	public String getInformacion() {
		return informacion;
	}
	
	public void setInformacion(String informacion) {
		this.informacion = informacion;
	}
	
	@DynamoDBAttribute(attributeName = "lat")
	public String getLatitud() {
		return latitud;
	}
	
	public void setLatitud(String latitud) {
		this.latitud = latitud;
	}
	
	@DynamoDBAttribute(attributeName = "lon")
	public String getLongitud() {
		return longitud;
	}
	
	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}
	
	@DynamoDBAttribute(attributeName = "telefono")
	public String getTelefono() {
		return telefono;
	}
	
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	
	@DynamoDBAttribute(attributeName = "valoracion")
	public String getValoracion() {
		return valoracion;
	}
	
	public void setValoracion(String valoracion) {
		this.valoracion = valoracion;
	}
	
}
