import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import { RouterLink } from '@angular/router';

type Usuario = FormGroup<{
  correo: FormControl<string | null>;
  contraseña: FormControl<string | null>;
}>

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario! : Usuario;
  hide: boolean = true;

  constructor(private fb: FormBuilder){
    this.usuario = this.fb.group({
      contraseña: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  getErrorMessage() {
    return this.usuario.controls.correo.hasError('required') ? 'You must enter a value' :
        this.usuario.controls.correo.hasError('email') ? 'Not a valid email' :
            '';
  }

  logIn(form: Usuario) {
    const correo = form.value.correo!;
    const contraseña = form.value.contraseña!;
  }
}
