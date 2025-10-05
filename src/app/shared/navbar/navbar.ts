import { RouterLink } from '@angular/router';
import { Component, inject, TemplateRef } from '@angular/core';

import { ModalService } from '../../core/services/modal-service';
import { MapService } from '../../core/services/map-service';
import { Button } from "../button/button";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Button],
  templateUrl: './navbar.html',
})
export class Navbar {
  modalService: ModalService = inject(ModalService);
  mapService = inject(MapService);

  close = () => this.modalService.close();

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const target = e.target?.result as string;
        const geoJson = JSON.parse(target).features;
        this.mapService.updatePoints(geoJson);
      };

      reader.readAsText(file);

      this.close();
    }
  }
}
