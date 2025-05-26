import { AfterViewInit, Component, inject, Injector, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario } from '../../../core/tipados';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import { EXCEL_TYPE } from '../../../environment/environment'
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import Swal from 'sweetalert2';

/**
 * Componente correspondiente a la vista de los asociados dentro de gestión
 */
@Component({
  selector: 'app-asociados',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule, MatPaginatorModule],
  templateUrl: './asociados.component.html',
  styleUrl: './asociados.component.css'
})
export class AsociadosComponent implements AfterViewInit {

  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  asociados!: Usuario[];
  displayedColumns: string[] = ['acciones', 'nombre', 'apellidos', 'telefono', 'dni', 'email', 'calle', 'esAdmin', 'pagado'];

  ngAfterViewInit() {
    this.recuperarUsuarios();
  }

  constructor(private usuService: UsuarioService, private dialog: MatDialog) {
  }

  /**
   * cuando se pulsa la opcion de borrar en un asociado. Salta un popup para confirmar la decisión, en caso afirmativo modifica los datos en la base de datos y refresca los datos de la tabla
   * @param asociado Asociado que se quiere eliminar
   */
  borrar(asociado: any) {
    Swal.fire({
      title: "Borrar",
      text: "¿Está seguro que quiere borrar este asociado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cerrar"
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.usuService.deleteUsuario(asociado.email).subscribe(() => this.recuperarUsuarios());
      }
    })
  }

  /**
   * recupera todos los usuarios de la base de datos mediante el uso del servicio de usuarios. Luego crea la tabla usando eson datos como base y le añade un paginator
   */
  recuperarUsuarios() {
    this.usuService.getAllUsuarios().subscribe(usuarios => {
      this.asociados = usuarios;
      this.dataSource = new MatTableDataSource(this.asociados);
      this.dataSource.paginator = this.paginator;
    })
  }

  /**
   * Cuando se pulsa la opcion de editar de un asociado se crea un popup con un formulario con los datos del usuario a editar
   * @param usuario 
   */
  modificar(usuario: any) {
    const dialogRef = this.dialog.open(CrearRegistroComponent, { data: usuario })
    dialogRef.afterClosed().subscribe(() => this.recuperarUsuarios())
  }

  /**
   * Al pulsar en excel descarga en el equipo un excel con los datos de todos los asociados de la base de datos
   */
  exportarExcel() {
    let datosExportar = this.asociados.map(a => ({
      Email: a.email,
      Nombre: a.nombre,
      Apellidos: a.apellidos,
      DNI: a.dni,
      Teléfono: a.telefono,
      Dirección: a.calle,
      Admin: a.esAdmin,
      Pagado: a.pagado
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asociados');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'asociados');
  }

  /**
   * Guarda el archivo en el equipo con un nombre en especifico
   * @param buffer 
   * @param nombreArchivo nomre con el que se va a descargar el archivo
   */
  private guardarArchivo(buffer: any, nombreArchivo: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
  }

  /**
   * Al pulsar en crear, aparece un popup con un formulario con los campos para crear un nuevo usuario
   */
  crear() {
    const dialogRef = this.dialog.open(CrearRegistroComponent, { data: undefined })
    dialogRef.afterClosed().subscribe(() => this.recuperarUsuarios())
  }

  /**
   * Sirve para filtrar los datos de la tabla mediante el input de un buscador
   * @param event el input del buscador
   */
  filtro(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
}
