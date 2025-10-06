import { RouterLink } from '@angular/router';
import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';

import { MapService, ModalService, NotificationService } from '../../core/services';
import { InvalidDataInterface } from '../../core/interfaces/data.interface';
import { CheckIcon, DownloadIcon, FileIcon, InfoIcon, PinIcon, SettingsIcon } from '../../icons';
import { Button, DetailsCell } from '../../shared';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Button, DetailsCell, SettingsIcon, FileIcon, DownloadIcon, CheckIcon, InfoIcon, PinIcon],
  templateUrl: './navbar.html',
})
export class Navbar {
  modalService: ModalService = inject(ModalService);
  mapService: MapService = inject(MapService);
  notificationService: NotificationService = inject(NotificationService)

  valid: WritableSignal<number> = signal(0);
  invalid: WritableSignal<number> = signal(0);
  invalidData: WritableSignal<InvalidDataInterface[] | null> = signal(null)

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

        this.invalidData.set(data.invalid as unknown as InvalidDataInterface[])

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

  deleteAllPoints() {
    if (window.confirm("¿Estás seguro de que quieres eliminar todos los puntos? La aplicación volverá a su estado inicial.")) {
      this.mapService.removeAllPoints();
    }
  }
}
