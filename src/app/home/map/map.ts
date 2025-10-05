import { Component, ElementRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

import { MapService } from '../../core/services/map-service';
import { Popup } from '../../popup/popup';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class Map {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  mapService: MapService = inject(MapService);
  private viewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit() {
    // Map centered on Santiago, Chile:
    const map = this.mapService.startMap(this.mapContainer, [-70.6506, -33.4429], 10);

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('click', 'points-layer', (e) => {
      const features = e.features?.[0];

      if (features.geometry.type === 'Point') {
        const coords = (features.geometry as GeoJSON.Point).coordinates as [number, number];

        const container = document.createElement('div');
        const containerRef = this.viewContainerRef.createComponent(Popup);
        
        container.appendChild(containerRef.location.nativeElement);
        containerRef.setInput('features', features);

        new maplibregl.Popup({ closeButton: false })
          .setLngLat(coords)
          .setDOMContent(container)
          .addTo(map);
      }
    })

    map.on('click', (e) => {
      const layers = map.getStyle().layers;

      if (layers[1]?.id === 'points-layer') {
        const clickBox: [[number, number], [number, number]] = [
          [e.point.x - 2, e.point.y - 2],
          [e.point.x + 2, e.point.y + 2]
        ];

        const features = map.queryRenderedFeatures(clickBox, { layers: ['points-layer'] });
  
        if (features.length > 0) {
          return;
        }
      }

      this.mapService.addPoint(e.lngLat.lng, e.lngLat.lat);
    })
  }
}
