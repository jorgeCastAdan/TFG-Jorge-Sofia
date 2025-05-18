import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-registro',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatCheckboxModule, MatIconModule],
  templateUrl: './crear-registro.component.html',
  styleUrl: './crear-registro.component.css'
})
export class CrearRegistroComponent {
  data = inject(MAT_DIALOG_DATA)

  usuarioForm: FormGroup;
  hide: boolean = true;
  usuarioIncorrecto: boolean = false;

  constructor(private fb: FormBuilder, private usService: UsuarioService, private dialogRef: MatDialogRef<CrearRegistroComponent>) {
    if (this.data !== undefined) {
      this.usuarioForm = this.fb.group({
        nombre: [this.data.nombre, Validators.required],
        apellidos: [this.data.apellidos, Validators.required],
        telefono: [this.data.telefono, Validators.required],
        dni: [this.data.dni, Validators.required],
        email: [{ value: this.data.email, disabled: true }, [Validators.required, Validators.email]],
        direccion: [this.data.calle, Validators.required],
        contraseña: [this.data.contrasena, Validators.required],
        esAdmin: [this.data.esAdmin]
      });
    }
    else {
      this.usuarioForm = this.fb.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', [Validators.required]],
        dni: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', Validators.required],
        contraseña: ['', [Validators.required]],
        esAdmin: ['']
      });
    }

  }

  onSubmit(form: FormGroup) {
    let usuario = {
      email: form.value.email,
      nombre: form.value.nombre,
      apellidos: form.value.apellidos,
      calle: form.value.direccion,
      contrasena: form.value.contraseña,
      telefono: form.value.telefono,
      dni: form.value.dni,
      esAdmin: form.value.esAdmin
    }

    if(usuario.esAdmin == ''){
      usuario.esAdmin = false
    }

    if (usuario.email == undefined) {
      usuario.email = this.data.email;
      this.usService.postUsuario(usuario).subscribe();
      this.dialogRef.close(this.usuarioForm.value);
    }
    else {
      this.usService.getUsuario(usuario.email).subscribe({
        next: () => {
          this.usuarioIncorrecto = true;
        },
        error: () => { this.usService.postUsuario(usuario).subscribe(); this.dialogRef.close(this.usuarioForm.value)}
      })
    }

  }
}
