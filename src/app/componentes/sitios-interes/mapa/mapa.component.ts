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
import { LeafletLoaderService } from '../../../core/services/leaflet-loader.service';

const centradoInicial = {
  latitud: 42.37348279273548,
  longitud: -6.2562092320290486,
  zoom: 12
};


/**
 * Componente en el que se crea el mapa de leaflet
 */
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private lugService: SitiosInteresService, private leafletService: LeafletLoaderService) {
    this.formMapa = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    })
  }

  /**
   * Metodo que se realiza al hacer submit en el pequeño formulario para buscar una ruta de un punto x a un punto marcado en el mapa
   * @param form los datos del formulario
   */
  onSubmit(form: any) {
    this.direccionNoEncontrada = false
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

  /**
   * sirve para poder tracker por el codigo de los marcadores en un for dentro del html
   * @param index 
   * @param item el item que se quiere trackear
   * @returns devuelve el codigo del item
   */
  trackByCodigo(index: number, item: any) {
    return item.codigo;
  }

  /**
   * Metodo para realizar un borrado de la ruta en el mapa
   */
  refrescar() {
    if (this.ruta) {
      this.mapa.removeControl(this.ruta)
      this.ruta = null
    }
  }


  /**
   * Metodo que se ejecuta una vez la vista de los componente sse inicialice, si se esta en el lado del clente (isPlatformBrowser(this.platformId)), inicializa el mapa
   */
  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const L = await this.leafletService.loadLeaflet();

      if (L) {
        this.leaflet = L;
        this.inicializarMapa(L);
      }
    }
  }

  /**
   * Metodo responsable de inicializar el mapa de leaflet. Si ya existe un mapa, lo elimina y lo vuelve a crear y le añade los marcadores recuperados de la base de datos
   * @param L El resultado del import de leaflet mediante un servicio
   */
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
        L.marker([marcador.latitud, marcador.longitud], {icon: L.icon({iconUrl : 'pin.png', iconSize : [32,32], iconAnchor: [16, 32]})})
          .addTo(this.mapa)
          .on('click', () => {
            this.pulsarMarcador.emit(marcador.lugar)
          });
      });
    }
  }
}

