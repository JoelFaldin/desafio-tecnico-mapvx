import { ElementRef, Injectable } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { GeoJsonInterface } from '../interfaces/geojson.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: maplibregl.Map;
  private styleUrl: string = 'http://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json';

  startMap(mapContainer: ElementRef<HTMLDivElement>, center: [number, number] = [0, 0], zoom: number = 2): maplibregl.Map {
    this.map = new maplibregl.Map({
      container: mapContainer.nativeElement,
      style: this.styleUrl,
      center: center,
      zoom: zoom,
    });

    return this.map;
  }

  setCenter(center: [number, number]) {
    this.map.setCenter(center);
  }

  setZoom(zoom: number) {
    this.map.setZoom(zoom);
  }

  async updatePoints(features: GeoJSON.Feature[] | GeoJSON.Feature) {
    if (!this.map) return;

    const featureArray = Array.isArray(features) ? features : [features];

    const featureCollection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: featureArray
    }

    const source = this.map.getSource('points') as maplibregl.GeoJSONSource;

    if (source) {
      source.setData(featureCollection);
    } else {
      this.map.addSource('points', {
        type: 'geojson',
        data: featureCollection
      });

      this.map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 6,
          'circle-color': '#B42222'
        }
      });
    }
  }
}
