import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate, NgIf } from '@angular/common';
import { v4 } from 'uuid'
import { ActividadesService } from '../../../../core/services/actividades.service';

@Component({
  selector: 'app-crear-registro',
  standalone: true,
  imports: [MatButtonModule, MatNativeDateModule, MatTimepickerModule, MatDatepickerModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatCheckboxModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crear-registro.component.html',
  styleUrl: './crear-registro.component.css'
})
export class CrearRegistroComponent {
  data = inject(MAT_DIALOG_DATA)

  codigoAct: string | null = null;

  actividadForm: FormGroup;

  constructor(private fb: FormBuilder, private actService: ActividadesService, private dialogRef: MatDialogRef<CrearRegistroComponent>) {
    if (this.data !== undefined) {
      this.actividadForm = this.fb.group({
        titulo: [this.data.titulo, Validators.required],
        descripcion: [this.data.descripcion, Validators.required],
        tipo: [this.data.tipo, Validators.required],
        fecha: [new Date(this.data.fecha), Validators.required],
        codigo: [{ value: this.data.codigo, disabled: true }],
        direccion: [this.data.direccion, Validators.required],
        reservable: [this.data.reservable],
        editando: [this.data.editando]
      });
    }
    else {
      this.codigoAct = v4()
      this.actividadForm = this.fb.group({
        titulo: ['', Validators.required],
        descripcion: ['', Validators.required],
        tipo: ['', Validators.required],
        fecha: ['', Validators.required],
        codigo: [{ value: this.codigoAct, disabled: true }],
        direccion: ['', Validators.required],
        reservable: [''],
        editando: ['']
      });
    }

  }

  onSubmit(form: FormGroup) {
    let actividad: any = {
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      tipo: form.value.tipo,
      fecha: form.value.fecha,
      codigo: form.value.codigo,
      reservable: form.value.reservable,
      direccion: form.value.direccion,
      editando: form.value.editando,
    }

    if (this.data) {
      actividad.asistentes = this.data.asistentes
    }
    else {
      actividad.asistentes = []
    }

    if (actividad.editando == '') {
      actividad.editando = false
    }

    if (actividad.reservable == '') {
      actividad.reservable = false
    }

    const fechaOriginal: Date = actividad.fecha;
    actividad.fecha = formatDate(fechaOriginal, 'yyyy-MM-dd', 'es-ES');

    if (this.codigoAct !== null) {
      actividad.codigo = this.codigoAct;
      this.actService.postActividad(actividad).subscribe()
      this.dialogRef.close(this.actividadForm.value);
    }
    else {
      actividad.codigo = this.data.codigo
      this.actService.postActividad(actividad).subscribe();
      this.dialogRef.close(this.actividadForm.value)
    }

  }
}
