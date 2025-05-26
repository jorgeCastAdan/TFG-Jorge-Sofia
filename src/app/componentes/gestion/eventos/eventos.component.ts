import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActividadesService } from '../../../core/services/actividades.service';
import { Actividad } from '../../../core/tipados';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import { EXCEL_TYPE } from '../../../environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

/**
 * Componente correspondiente a la vista de las actividades dentro de gestion
 */
@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements AfterViewInit {

  dataSource!: MatTableDataSource<Actividad>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  actividades!: Actividad[];
  displayedColumns: string[] = ['acciones', 'codigo', 'titulo', 'tipo', 'fecha', 'direccion', 'reservable', 'asistentes', 'editando'];

  ngAfterViewInit() {
    this.recuperarActividades();
  }

  constructor(private actServicio: ActividadesService, private dialog: MatDialog) {
    this.recuperarActividades()
  }

  /**
   * Recupera todas las actividades de base de datos y crea una tabla con dichos datos además de añadirle a la tabla un paginator
   */
  recuperarActividades() {
    this.actServicio.getAllActividades().subscribe(actividades => {
      this.actividades = actividades;
      this.dataSource = new MatTableDataSource(this.actividades);
      this.dataSource.paginator = this.paginator;
    })
  }

  /**
   * Al pulsar en borrar en una actividad, salta un popup para confirmar la decisión. En caso afirmativo, elimina la actividad de base de datos y refresca los datos de la tabla
   * @param actividad La actividad que se quiere borrar
   */
  borrar(actividad: any) {
    Swal.fire({
      title: "Borrar",
      text: "¿Está seguro que quiere borrar esta actividad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cerrar"
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.actServicio.deleteActividad(actividad.codigo).subscribe(() => this.recuperarActividades());
      }
    })
  }

  /**
   * Al pulsar editar en una actividad, salta un popup con un formulario con los datos de la actividad que se quiere modificar
   * @param actividad Actividad a modificar
   */
  modificar(actividad: any) {
    const dialogRef = this.dialog.open(CrearRegistroComponent, { data: actividad })
    dialogRef.afterClosed().subscribe(() => this.recuperarActividades())
  }

  /**
   * Al pulsar en excel, descarga un archivo de excel con todos los datos de las actividades en base de datos
   */
  exportarExcel() {
    let datosExportar = this.actividades.map(a => ({
      Código: a.codigo,
      Titulo: a.titulo,
      Asistentes: a.asistentes.length,
      Descripción: a.descripcion,
      Reservale: a.reservable,
      Tipo: a.tipo,
      Fecha: a.fecha,
      Dirección: a.direccion
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Actividades');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'actividades');
  }

  /**
   * Descarga el archivo en formato de excel con un nomre en especifico
   * @param buffer 
   * @param nombreArchivo Nombre del archivo a descargar
   */
  private guardarArchivo(buffer: any, nombreArchivo: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
  }

  /**
   * Al pulsar en crear, salta un popup con un formulario con los elementos necesarios para crear una actividad nueva
   */
  crear() {
    const dialogRef = this.dialog.open(CrearRegistroComponent, { data: undefined })
    dialogRef.afterClosed().subscribe(() => this.recuperarActividades())
  }

  /**
   * Filtra los elementos de la tabla a través de un input
   * @param event El input por el que se filtran los datos
   */
  filtro(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
}
