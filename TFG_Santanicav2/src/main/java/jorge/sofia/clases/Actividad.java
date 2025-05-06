package clases;

import java.util.List;
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
@DynamoDBTable(tableName = "Actividadesv2.1")
public class Actividad {
	
	private String titulo;
	private String descipcion;
	private boolean editando;
	private String codigo;
	private boolean reservable;
	private List<Map<String, String>> asistentes;
	
	@DynamoDBAttribute(attributeName = "codigo")
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
	@DynamoDBHashKey(attributeName = "titulo")
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
	public List<Map<String, String>> getAsistentes() {
		return asistentes;
	}
	
	public void setAsistentes(List<Map<String, String>> asistentes) {
		this.asistentes = asistentes;
	}
	
}
