import { Component, EventEmitter, Output } from '@angular/core';

import { Button } from "../button/button";

@Component({
  selector: 'app-modal',
  imports: [Button],
  templateUrl: './modal.html',
})
export class Modal {
  @Output() close = new EventEmitter<void>();

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const target = e.target?.result as string;
        const geoJson = JSON.parse(target).features;
        console.log(geoJson);
      };

      reader.readAsText(file);

      this.close.emit();
    }
  }
}
