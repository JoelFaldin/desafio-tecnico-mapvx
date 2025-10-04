import { Component, EventEmitter, inject, Output } from '@angular/core';

import { Button } from "../button/button";
import { MapService } from '../core/services/map-service';

@Component({
  selector: 'app-modal',
  imports: [Button],
  templateUrl: './modal.html',
})
export class Modal {
  @Output() close = new EventEmitter<void>();
  mapService = inject(MapService);

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const target = e.target?.result as string;
        const geoJson = JSON.parse(target).features;
        this.mapService.addDifferentPoints(geoJson);
      };

      reader.readAsText(file);

      this.close.emit();
    }
  }
}
