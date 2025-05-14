import { Component } from '@angular/core';
import { ActividadesService } from '../../../core/services/actividades.service';
import { Actividad } from '../../../core/tipados';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import { EXCEL_TYPE } from '../../../environment/environment';


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {

  actividades!: Actividad[];
  displayedColumns: string[] = ['acciones', 'codigo', 'titulo', 'tipo', 'fecha', 'direccion', 'reservable', 'asistentes'];

  constructor(private actServicio: ActividadesService) {
    this.actServicio.getAllActividades().subscribe(actividades => this.actividades = actividades)
  }

  seleccionarElm(row: any) {

  }
  borrar(usuario: any) {

  }

  modificar(usuario: any) {

  }

  exportarExcel() {
    let datosExportar = this.actividades.map(a => ({
      Código:a.codigo,
      Titulo: a.titulo,
      Asistentes:a.asistentes.length,
      Descripción:a.descripcion,
      Reservale:a.reservable,
      Tipo:a.tipo,
      Fecha:a.fecha,
      Dirección:a.direccion
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

  crear(){
    
  }
}
