import { Component} from '@angular/core';
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


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {

  dataSource!: MatTableDataSource<Actividad>;

  actividades!: Actividad[];
  displayedColumns: string[] = ['acciones', 'codigo', 'titulo', 'tipo', 'fecha', 'direccion', 'reservable', 'asistentes', 'editando'];

  constructor(private actServicio: ActividadesService, private dialog: MatDialog) {
    this.actServicio.getAllActividades().subscribe(actividades => {
      this.actividades = actividades;
      this.dataSource = new MatTableDataSource(this.actividades);
    })
  }

  seleccionarElm(row: any) {

  }
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
        this.actServicio.deleteActividad(actividad.codigo).subscribe(() => this.actServicio.getAllActividades().subscribe(actividades => this.actividades = actividades));
      }
    })
  }

  modificar(actividad: any) {
    const dialogRef = this.dialog.open(CrearRegistroComponent, { data: actividad })
    dialogRef.afterClosed().subscribe(() => this.actServicio.getAllActividades().subscribe(actividades => this.actividades = actividades))
  }

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

  private guardarArchivo(buffer: any, nombreArchivo: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
  }

  crear() {
    const dialogRef = this.dialog.open(CrearRegistroComponent, { data: undefined })
    dialogRef.afterClosed().subscribe(() => this.actServicio.getAllActividades().subscribe(actividades => this.actividades = actividades))
  }

  filtro(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
}
