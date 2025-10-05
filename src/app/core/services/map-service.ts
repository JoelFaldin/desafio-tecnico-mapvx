import { ElementRef, Injectable } from '@angular/core';
import maplibregl from 'maplibre-gl';

import { PropertiesInterface } from '../interfaces/geojson.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: maplibregl.Map;
  private styleUrl: string = 'http://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json';
  private points: GeoJSON.Feature[] = [];

  constructor() {
    this.loadPointsFromLocalStorage();
  }

  startMap(mapContainer: ElementRef<HTMLDivElement>, center: [number, number] = [0, 0], zoom: number = 2): maplibregl.Map {
    this.map = new maplibregl.Map({
      container: mapContainer.nativeElement,
      style: this.styleUrl,
      center: center,
      zoom: zoom,
    });

    this.map.on('load', () => {
      this.initializePointsLayer();
    })

    return this.map;
  }

  private loadPointsFromLocalStorage() {
    const items = localStorage.getItem('points');
    if (items) {
      try {
        this.points = JSON.parse(items);
      } catch (error) {
        console.error("Error parsing points from localStorage:", error);
        this.points = [];
      }
    }
  }

  private initializePointsLayer() {
    if (!this.map) return;

    if (this.points.length > 0) {
      this.map.addSource('points', {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: this.points
        }
      });

      this.map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 10,
          'circle-color': '#B42222'
        }
      });
    }
  }

  setCenter(center: [number, number]) {
    this.map.setCenter(center);
  }

  setZoom(zoom: number) {
    this.map.setZoom(zoom);
  }

  // Add multiple points to map and update source:
  async updatePoints(features: GeoJSON.Feature[] | GeoJSON.Feature) {
    if (!this.map) return;

    const featureArray = Array.isArray(features) ? features : [features];
    const fixedFeatures = featureArray.map((feature, index) => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          id: feature.id ?? `points-${this.points.length + index + 1}`,
        }
      }
    })

    this.points.push(...fixedFeatures);
    localStorage.setItem('points', JSON.stringify(this.points));

    const source = this.map.getSource('points') as maplibregl.GeoJSONSource;

    if (source) {
      source.setData({
        type: "FeatureCollection",
        features: this.points
      });
    } else {
      this.map.addSource('points', {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: this.points
        }
      });

      this.map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 10,
          'circle-color': '#B42222'
        }
      });
    }
  }

  // Add single point to map and update source:
  async addPoint(lng: number, lat: number) {
    if (!this.map) return;

    const newPoint: GeoJSON.Feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
      properties: {
        id: `points-${this.points.length + 1}`,
      }
    }

    this.points.push(newPoint);
    localStorage.setItem('points', JSON.stringify(this.points));

    const source = this.map.getSource('points') as maplibregl.GeoJSONSource;

    if (source) {
      source.setData({
        type: "FeatureCollection",
        features: this.points
      })
    } else {
      this.map.addSource('points', {
        type: 'geojson',
        data: newPoint
      });

      this.map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 10,
          'circle-color': '#B42222'
        }
      });
    }
  }

  editPoint(properties: PropertiesInterface) {
    const point = this.points.find(p => p.properties?.['id'] === properties?.id);

    if (point) {
      point.properties = {
        ...point.properties,
        ...properties
      };

      const source = this.map.getSource('points') as maplibregl.GeoJSONSource;

      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: this.points
        });

        localStorage.setItem('points', JSON.stringify(this.points));
      }
    } else {
      console.warn(`Point with id ${properties?.id} not found.`);
    }
  }

  deletePoint(id: string) {
    const point = this.points.find(p => p.properties?.['id'] === id);

    if (point) {
      this.points = this.points.filter(p => p.properties?.['id'] !== id);

      const source = this.map.getSource('points') as maplibregl.GeoJSONSource;

      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: this.points
        });

        localStorage.setItem('points', JSON.stringify(this.points));
      }
    } else {
      console.warn(`Point with id ${id} not found.`);
    }
  }
}
