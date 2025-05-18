import { Component } from '@angular/core';
import { ActividadesService } from '../../core/services/actividades.service';
import { Actividad } from '../../core/tipados';
import { NgFor } from '@angular/common';
import { CortarDescPipe } from './cortar-desc.pipe';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  standalone:true,
  imports: [NgFor, CortarDescPipe, MatDividerModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  actividades:Actividad[];

  constructor(private http:ActividadesService, private router:Router){
    this.actividades = []
    this.http.getAllActividades().subscribe(actividadesBd => this.actividades = actividadesBd)
  }

  abrirActividad(codigo: string){
    this.router.navigate(['/actividad', codigo])
  }
  
}
