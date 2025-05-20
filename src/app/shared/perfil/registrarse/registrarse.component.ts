import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AuthService } from '../../../core/services/auth.service';

type UsuarioForm = FormGroup<{
  correo: FormControl<string | null>;
  nombre: FormControl<string | null>;
  apellidos: FormControl<string | null>;
  telefono: FormControl<string | null>;
  dni: FormControl<string | null>;
  direccion: FormControl<string | null>;
  contraseña: FormControl<string | null>;
}>

/**
 * Componante con las funcionalidades y los elementos responsales del registro de un nuevo usuario
 */
@Component({
  selector: 'app-registrarse',
  standalone:true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink, MatIconModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

 usuario! : UsuarioForm;
 hide: boolean = true;
 usuarioExistente = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private auth: AuthService){
    this.usuario = this.fb.group({
      contraseña: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  /**
   * Compruea que el email exista en base de datos,
   * en caso de que exista se notifica al usuario para que modifique el email,
   * en el caso de que no exista crea al usuario con los datos rellenados, crea la sesion correspondiente y redirige la ventana a la raiz '/'
   * @param form objeto con los datos del formulario
   */
  registrarse(form: UsuarioForm) {
    if(this.usuarioExistente){
      this.usuarioExistente = !this.usuarioExistente
    }

    this.usuarioService.getUsuario(form.value.correo!).subscribe({
      next: () => this.usuarioExistente = true,
      error: () => {
        let us = {
          dni:form.value.dni,
          nombre:form.value.nombre,
          apellidos:form.value.apellidos,
          calle:form.value.direccion,
          email:form.value.correo,
          contrasena:form.value.contraseña,
          telefono:form.value.telefono,
        }

        this.usuarioService.postUsuario(us).subscribe()
        this.auth.createToken(us.email!)
        window.location.href = '/'
      }
    })
  }
}
