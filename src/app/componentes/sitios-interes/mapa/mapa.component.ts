import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, Input, Output, EventEmitter } from '@angular/core';
import { LugarInteres } from '../../../core/tipados';

const centradoInicial = {
  latitud: 42.37348279273548,
  longitud: -6.2562092320290486,
  zoom:12
};

@Component({
  selector: 'app-mapa',
  standalone:true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent  implements AfterViewInit{
  private mapa: any;

  @Input({required:true}) marcadores!: LugarInteres[];

  @Output() pulsarMarcador = new EventEmitter();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


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
      this.inicializarMapa(L);
    }).catch(err => {
      console.error('Error al cargar Leaflet:', err);
    });
  }

  prueba(event: any){
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

    if(this.marcadores !== undefined){
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

