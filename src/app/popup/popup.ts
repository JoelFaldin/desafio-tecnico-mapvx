import { Component, computed, inject, Input, OnInit, TemplateRef } from '@angular/core';

import { Button } from "../shared/button/button";
import { ButtonSecondary } from "../shared/button-secondary/button-secondary";
import { ModalService } from '../core/services/modal-service';

@Component({
  selector: 'app-popup',
  imports: [Button, ButtonSecondary],
  templateUrl: './popup.html',
})
export class Popup implements OnInit {
  @Input() features: any;
  private modalService = inject(ModalService);
  onClose!: () => void;

  name = computed(() => this.features?.properties?.['name'] ?? null);
  category = computed(() => this.features?.properties?.['category'] ?? null);

  ngOnInit() {
    console.log(this.features);
  }

  closePopup() {
    if (this.onClose) {
      this.onClose();
    }
  }

  edit(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  closeEditModal = () => this.modalService.close();
}
