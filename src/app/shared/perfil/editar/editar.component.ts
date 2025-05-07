import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import {Usuario} from '../../../core/tipados'

type UsuarioForm = FormGroup<{
  email: FormControl<string | null>;
  nombre: FormControl<string | null>;
  apellidos: FormControl<string | null>;
  telefono: FormControl<string | null>;
  dni: FormControl<string | null>;
  direccion: FormControl<string | null>;
  contraseña: FormControl<string | null>;
}>


@Component({
  selector: 'app-editar',
  standalone:true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {


  constructor(private auth : AuthService, private fb:FormBuilder, private usuarioService : UsuarioService){
    usuarioService.getUsuario(auth.getToken()).subscribe(
      (usuario) => {
        console.log(usuario)
        this.usuarioForm = this.fb.group({
          email: [`${usuario.email}`, [Validators.required, Validators.email]],
          contraseña: [`${usuario.contrasena}`, Validators.required],
          apellidos: [`${usuario.apellidos}`, Validators.required],
          nombre: [`${usuario.nombre}`, Validators.required],
          direccion: [`${usuario.calle}`, Validators.required],
          dni: [`${usuario.dni}`, Validators.required],
          telefono: [`${usuario.telefono}`, Validators.required]
        })
      }
    )

  }
  usuarioForm! : UsuarioForm;
  hide: boolean = true;

  guardar(form: UsuarioForm) {
    let usuario = {
      email:form.value.email,
      nombre : form.value.nombre,
      apellidos:form.value.apellidos,
      calle:form.value.direccion,
      contrasena:form.value.contraseña,
      telefono:form.value.telefono,
      dni:form.value.dni
    }
    this.auth.setToken(JSON.stringify(usuario))
    window.location.href = '/'
  }
}
