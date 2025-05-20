import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, Input, Output, EventEmitter } from '@angular/core';
import { LugarInteres } from '../../../core/tipados';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SitiosInteresService } from '../../../core/services/sitios-interes.service';

const centradoInicial = {
  latitud: 42.37348279273548,
  longitud: -6.2562092320290486,
  zoom: 12
};



@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, NgIf, MatInputModule, MatSelectModule, CommonModule, NgFor, MatIconModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {
  private mapa: any;

  direccionNoEncontrada: boolean = false;

  private leaflet: any;

  private ruta: any;

  @Input({ required: true }) marcadores!: LugarInteres[];

  @Output() pulsarMarcador = new EventEmitter();

  formMapa: FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private lugService: SitiosInteresService) {
    this.formMapa = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    })
  }

  onSubmit(form: any) {
    if (this.ruta) {
      this.mapa.removeControl(this.ruta)
      this.ruta = null
    }
    this.lugService.getSitio(form.value.destino).subscribe(sitio => {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.value.origen)}`;

      fetch(url).then(res => res.json()).then(data => {
        if (data.length > 0) {
          this.ruta = this.leaflet.Routing.control({
            waypoints: [
              this.leaflet.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon)),
              this.leaflet.latLng(sitio.latitud, sitio.longitud)
            ],
            addWaypoints: false,
            draggableWaypoints: false,
            show: false,
          }).addTo(this.mapa)
        }
        else {
          this.direccionNoEncontrada = true
        }
      });
    })
  }

  trackByCodigo(index: number, item: any) {
    return item.codigo;
  }

  refrescar() {
    if (this.ruta) {
      this.mapa.removeControl(this.ruta)
      this.ruta = null
    }
  }


  /**
   * El uso de isPlatformrowser se asegura que leaflet solo se importe
   * y se cargue cuando la aplicacion esta en el lado del cliente. Asi se evita el error
   * de 'ReferenceError: window is not defined' que salta si leaflet se carga en el servidor
   */
  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let L = await import('leaflet');
      (window as any).L = L;
      await import('leaflet-routing-machine');

      this.leaflet = L;
      this.inicializarMapa(L);
    }
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

