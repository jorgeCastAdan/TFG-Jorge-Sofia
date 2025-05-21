import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LeafletLoaderService {
  private leaflet: any;
  private loaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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