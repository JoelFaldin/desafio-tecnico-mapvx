import { Component, computed, Input, OnInit } from '@angular/core';
import { Button } from "../shared/button/button";
import { ButtonSecondary } from "../shared/button-secondary/button-secondary";

@Component({
  selector: 'app-popup',
  imports: [Button, ButtonSecondary],
  templateUrl: './popup.html',
})
export class Popup implements OnInit {
  @Input() features: any;
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

  edit() {
    console.log('editing')
  }
}
