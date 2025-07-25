package clases;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

/**
 * Esta clase representa la entidad Actividad que corresponde con la tabla Actividades de la base de datos.
 * 
 * 
 * @author Jorge Castellanos y Sofia Ubeda
 * @version 2.1
 */

@Entity
@Table(name = "actividades")
public class Actividad implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id_actividad")
	private UUID codigo;
	
	@Column(name = "titulo")
	private String titulo;
	
	@Column(name = "descripcion")
	private String descripcion;
	
	@Column(name = "editando")
	private boolean editando;
	
	@Column(name = "reservable")
	private boolean reservable;
	
	@Column(name = "tipo")
	private String tipo;
	
	@Column(name = "direccion")
	private String direccion;
	
	@Column(name = "fecha")
	private String fecha;
	
	@Column(name = "imagen")
	private String imagen;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "asistentes",
				joinColumns = @JoinColumn(name = "cod_actividad"),
				inverseJoinColumns = @JoinColumn(name = "cod_usuario"))
	private List<Usuario> asistentes;
	
	public UUID getCodigo() {
		return codigo;
	}
	public void setCodigo(UUID codigo) {
		this.codigo = codigo;
	}
	
	public String getTitulo() {
		return titulo;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descipcion) {
		this.descripcion = descipcion;
	}

	public boolean isEditando() {
		return editando;
	}
	public void setEditando(boolean editando) {
		this.editando = editando;
	}

	public boolean isReservable() {
		return reservable;
	}
	public void setReservable(boolean reservable) {
		this.reservable = reservable;
	}

	public List<Usuario> getAsistentes() {
		return asistentes;
	}
	
	public void setAsistentes(List<Usuario> asistentes) {
		this.asistentes = asistentes;
	}

	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getImagen() {
		return imagen;
	}
	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	@Override
	public int hashCode() {
		return Objects.hash(codigo);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Actividad other = (Actividad) obj;
		return Objects.equals(codigo, other.codigo);
	}
	@Override
	public String toString() {
		return "Actividad [titulo=" + titulo + ", descripcion=" + descripcion + ", editando=" + editando + ", codigo="
				+ codigo + ", reservable=" + reservable + ", tipo=" + tipo + ", direccion=" + direccion + ", fecha="
				+ fecha + ", asistentes=" + asistentes + "]";
	}
	
}
