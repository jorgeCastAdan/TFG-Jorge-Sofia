package clases;

import java.util.List;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBTable(tableName = "Actividades")
public class Actividad {
	
	private String titulo;
	private String descripcion;
	private boolean editando;
	private String codigo;
	private boolean reservable;
	private String tipo;
	private String direccion;
	private String fecha;
	private String imagen;
	private List<String> asistentes;
	
	@DynamoDBHashKey(attributeName = "codigo")
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
	@DynamoDBAttribute(attributeName = "titulo")
	public String getTitulo() {
		return titulo;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	@DynamoDBAttribute(attributeName = "descripcion")
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descipcion) {
		this.descripcion = descipcion;
	}
	
	@DynamoDBAttribute (attributeName = "editando")
	public boolean isEditando() {
		return editando;
	}
	public void setEditando(boolean editando) {
		this.editando = editando;
	}
	
	@DynamoDBAttribute (attributeName = "reservable")
	public boolean isReservable() {
		return reservable;
	}
	public void setReservable(boolean reservable) {
		this.reservable = reservable;
	}
	
	@DynamoDBAttribute (attributeName = "asistentes")
	public List<String> getAsistentes() {
		return asistentes;
	}
	
	public void setAsistentes(List<String> asistentes) {
		this.asistentes = asistentes;
	}
	
	@DynamoDBAttribute (attributeName = "tipo")
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	@DynamoDBAttribute (attributeName = "direccion")
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	
	@DynamoDBAttribute (attributeName = "fecha")
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	
	@DynamoDBAttribute (attributeName = "imagen")
	public String getImagen() {
		return imagen;
	}
	public void setImagen(String imagen) {
		this.imagen = imagen;
	}
	@Override
	public String toString() {
		return "Actividad [titulo=" + titulo + ", descripcion=" + descripcion + ", editando=" + editando + ", codigo="
				+ codigo + ", reservable=" + reservable + ", tipo=" + tipo + ", direccion=" + direccion + ", fecha="
				+ fecha + ", asistentes=" + asistentes + "]";
	}
	
}
