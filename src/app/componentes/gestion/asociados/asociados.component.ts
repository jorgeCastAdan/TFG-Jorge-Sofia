import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario } from '../../../core/tipados';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import { EXCEL_TYPE } from '../../../environment/environment'

@Component({
  selector: 'app-asociados',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './asociados.component.html',
  styleUrl: './asociados.component.css'
})
export class AsociadosComponent {

  asociados!: Usuario[];
  displayedColumns: string[] = ['acciones', 'nombre', 'apellidos', 'telefono', 'dni', 'email', 'calle', 'esAdmin'];

  constructor(private usuService: UsuarioService) {
    this.usuService.getAllUsuarios().subscribe(usuarios => this.asociados = usuarios)
  }

  seleccionarElm(row: any) {

  }

  borrar(usuario: any) {

  }

  modificar(usuario: any) {

  }

  exportarExcel() {
    let datosExportar = this.asociados.map(a => ({
      Email:a.email,
      Nombre:a.nombre,
      Apellidos:a.apellidos,
      DNI:a.dni,
      Teléfono:a.telefono,
      Dirección:a.calle,
      Admin:a.esAdmin
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asociados');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivo(excelBuffer, 'asociados');
  }

  private guardarArchivo(buffer: any, nombreArchivo: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
  }
}
