import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, Input, Output, EventEmitter } from '@angular/core';
import { LugarInteres } from '../../../core/tipados';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SitiosInteresService } from '../../../core/services/sitios-interes.service';
import { parse } from 'path';

const centradoInicial = {
  latitud: 42.37348279273548,
  longitud: -6.2562092320290486,
  zoom: 12
};



@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, NgIf, MatInputModule, MatSelectModule, CommonModule, NgFor],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {
  private mapa: any;

  direccionNoEncontrada: boolean = false;

  leaflet: any;

  @Input({ required: true }) marcadores!: LugarInteres[];

  @Output() pulsarMarcador = new EventEmitter();

  formMapa: FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private lugService:SitiosInteresService) {
    this.formMapa = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    })
  }

  onSubmit(form: any) {
    this.lugService.getSitio(form.value.destino).subscribe(sitio => {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.value.origen)}`;

      fetch(url).then(res => res.json()).then(data => {
        if(data.length > 0){
          this.leaflet.Routing.control({
            waypoints: [
              this.leaflet.latlng(sitio.latitud, sitio.longitud),
              this.leaflet.latlng(parseFloat(data[0].lat), parseFloat(data[0].lon))
            ]
          }).addTo(this.mapa)
        }
        else{
          this.direccionNoEncontrada = true
        }
      });
    })
  }

  trackByCodigo(index: number, item: any) {
    return item.codigo;
  }


  /**
   * El uso de isPlatformrowser se asegura que leaflet solo se importe
   * y se cargue cuando la aplicacion esta en el lado del cliente. Asi se evita el error
   * de 'ReferenceError: window is not defined' que salta si leaflet se carga en el servidor
   */
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarLeaflet();
    }
  }

  inicializarLeaflet() {
    import('leaflet').then((L) => {
      this.leaflet = L
      this.inicializarMapa(L);
    }).catch(err => {
      console.error('Error al cargar Leaflet:', err);
    });
  }

  prueba(event: any) {
    console.log(event)
  }

  inicializarMapa(L: any) {
    const mapContainer = L.DomUtil.get('mapa');

    if (mapContainer && mapContainer['_leaflet_id']) {
      mapContainer.remove();

      const newContainer = document.createElement('div');
      newContainer.id = 'mapa';
      newContainer.style.height = '100%';

      const parent = mapContainer.parentNode;
      if (parent) parent.appendChild(newContainer);
    }

    this.mapa = L.map('mapa').setView(
      [centradoInicial.latitud, centradoInicial.longitud],
      centradoInicial.zoom
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapa);

    if (this.marcadores !== undefined) {
      this.marcadores.forEach(marcador => {
        L.marker([marcador.latitud, marcador.longitud])
          .addTo(this.mapa)
          .on('click', () => {
            this.pulsarMarcador.emit(marcador.lugar)
          });
      });
    }
  }
}

