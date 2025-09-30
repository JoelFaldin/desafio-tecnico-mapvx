import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

import { MapService } from '../../map-service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class Map {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  mapService: MapService = inject(MapService);

  ngAfterViewInit() {
    // Map centered on Santiago, Chile:
    const map = this.mapService.startMap(this.mapContainer, [-70.6483, -33.4569], 6);

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
  }
}
