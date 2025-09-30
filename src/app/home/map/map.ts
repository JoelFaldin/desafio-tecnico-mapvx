import { Component, ElementRef, ViewChild } from '@angular/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class Map {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: 'http://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json',
      center: [-70.6483, -33.4569],
      zoom: 20,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
  }
}
