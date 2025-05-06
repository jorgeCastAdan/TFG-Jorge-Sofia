import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

type Usuario = FormGroup<{
  correo: FormControl<string | null>;
  nombre: FormControl<string | null>;
  apellidos: FormControl<string | null>;
  telefono: FormControl<string | null>;
  dni: FormControl<string | null>;
  direccion: FormControl<string | null>;
  contraseña: FormControl<string | null>;
}>

@Component({
  selector: 'app-registrarse',
  standalone:true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink, MatIconModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  usuario! : Usuario;
 hide: boolean = true;

  constructor(private fb: FormBuilder){
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

  registrarse(arg0: Usuario) {

  }
}
