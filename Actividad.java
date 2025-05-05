package clases;

import java.util.Map;

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
	
	private String id;
	private String titulo;
	private String descipcion;
	private boolean editando;
	private boolean reservable;
	private Map<String, String> asistentes;
	
	@DynamoDBHashKey(attributeName = "id")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	@DynamoDBAttribute(attributeName = "titulo")
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	@DynamoDBAttribute(attributeName = "descripcion")
	public String getDescipcion() {
		return descipcion;
	}
	public void setDescipcion(String descipcion) {
		this.descipcion = descipcion;
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
	public Map<String, String> getAsistentes() {
		return asistentes;
	}
	public void setAsistentes(Map<String, String> asistentes) {
		this.asistentes = asistentes;
	}
	
}
