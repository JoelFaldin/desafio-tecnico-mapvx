import { RouterLink } from '@angular/router';
import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';

import { ModalService } from '../../core/services/modal-service';
import { MapService } from '../../core/services/map-service';
import { Button } from "../button/button";
import { NotificationService } from '../../core/services/notification-service';
import { DetailsCell } from "../details-cell/details-cell";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Button, DetailsCell],
  templateUrl: './navbar.html',
})
export class Navbar {
  modalService: ModalService = inject(ModalService);
  mapService: MapService = inject(MapService);
  notificationService: NotificationService = inject(NotificationService)

  valid: WritableSignal<number> = signal(0);
  invalid: WritableSignal<number> = signal(0);

  points = this.mapService.getPoints()

  close = () => this.modalService.close();

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  onFileSelected(event: Event, content: TemplateRef<any>) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const target = e.target?.result as string;
        const geoJson = JSON.parse(target).features;
        const data = await this.mapService.updatePoints(geoJson);

        if (data) {
          this.valid.set(data.valid.length)
          this.invalid.set(data.invalid.length)

          this.notificationService.open(content)
        }
      };

      reader.readAsText(file);

      this.close();
    }
  }

  exportResults() {
    this.mapService.exportPoints();
  }
}
