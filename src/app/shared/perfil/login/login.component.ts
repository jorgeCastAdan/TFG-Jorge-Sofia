import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AuthService } from '../../../core/services/auth.service';

type Usuario = FormGroup<{
  correo: FormControl<string | null>;
  contraseña: FormControl<string | null>;
}>

/**
 * Clase con la funcionalidad y elementos responsales del inicio de sesion
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioServicio =  inject(UsuarioService);
  auth = inject(AuthService);

  usuarioIncorrecto:boolean = false;
  contrasenaIncorrecta = false;

  usuario! : Usuario;
  hide: boolean;

  constructor(
    private fb: FormBuilder,)
  {
    this.hide = true;
    this.usuario = this.fb.group({
      contraseña: ['', Validators.required],
      correo: ['', [Validators.required]]
    })
    
  }

  /**
   * Comprueba que el email exista en base de datos y en caso de existir comprueba si la contraseña esta bien,
   * en caso correcto se crea una sesion con su token y se redirige a la pestaña principal,
   * en caso contrario se notifica al usuario por pantalla
   * @param form objeto con los datos del formulario
   */
  logIn(form: Usuario) {

    this.usuarioIncorrecto = false;

    this.contrasenaIncorrecta = false;

    let correo = form.value.correo!;
    let contraseña = form.value.contraseña!;

    this.usuarioServicio.getUsuario(correo).subscribe({
      next: (usuario) => {
          if(usuario.contrasena === contraseña){
            this.auth.createToken(correo)
            window.location.href = '/'
          }
          else{
            this.contrasenaIncorrecta = true
          }
      },
      error: () => {this.usuarioIncorrecto = true;}
    })
  }
}
