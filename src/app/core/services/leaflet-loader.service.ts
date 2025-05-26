import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
/**
 * clase responsable de cargar la libreria de leaflet una unica vez para evitar errores
 */
export class LeafletLoaderService {
  private leaflet: any;
  private loaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * realiza el import de la libreria de leafrlet de forma asincrona
   * @returns devuelve el resultado del import de forma asincrona en una promesa
   */
  async loadLeaflet(): Promise<any> {
    if (this.loaded) return this.leaflet;

    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      (window as any).L = L;

      await import('leaflet-routing-machine');

      this.leaflet = L;
      this.loaded = true;
      return L;
    }

    return null;
  }
}