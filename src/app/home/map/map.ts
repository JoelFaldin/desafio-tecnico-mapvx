import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

import { MapService } from '../../core/services/map-service';

const geojsonData: GeoJSON.Feature[] = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-70.65387, -33.443018]
    },
    properties: {
      name: "Palacio de La Moneda",
      category: "landmark"
    }
  }
];

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
    const map = this.mapService.startMap(this.mapContainer, [-70.6506, -33.4429], 10);

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('click', (e) => {
      this.mapService.addPoint(e.lngLat.lng, e.lngLat.lat);
    })

    // map.on('')
  }


}
