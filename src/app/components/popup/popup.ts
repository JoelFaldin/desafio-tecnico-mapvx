import { Component, computed, inject, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MapService, ModalService } from '../../core/services';
import { Button, ButtonSecondary, ButtonWarning } from '../../shared';

@Component({
  selector: 'app-popup',
  imports: [Button, ButtonSecondary, ReactiveFormsModule, ButtonWarning],
  templateUrl: './popup.html',
})
export class Popup {
  private modalService = inject(ModalService);
  private mapService = inject(MapService);

  @Input() features: any;

  name = computed(() => this.features?.properties?.['name'] ?? null);
  category = computed(() => this.features?.properties?.['category'] ?? null);

  form = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  })

  ngAfterViewInit() {
    this.form.setValue({
      name: this.name() ?? '',
      category: this.category() ?? '',
    })
  }

  onClose!: () => void;

  closePopup() {
    if (this.onClose) {
      this.onClose();
    }
  }

  edit(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  closeEditModal = () => this.modalService.close();

  saveChanges() {
    if (this.form.value.name == this.features.properties.name && this.form.value.category == this.features.properties.category) {
      console.warn("No changes made");
      return;
    }

    const newProperties = {
      ...this.features.properties,
      name: this.form.value.name,
      category: this.form.value.category,
    }

    this.mapService.editPoint(newProperties);
    this.closeEditModal();
    this.closePopup();
  }

  deletePoint() {
    if (window.confirm("¿Estás seguro de que deseas eliminar este punto?")) {
      this.mapService.deletePoint(this.features.properties.id);
      this.closeEditModal();
      this.closePopup();
    } else {
      return;
    }
  }
}
