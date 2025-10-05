import { Component, computed, Input, OnInit } from '@angular/core';
import { Button } from "../button/button";

@Component({
  selector: 'app-popup',
  imports: [Button],
  templateUrl: './popup.html',
})
export class Popup implements OnInit {
  @Input() features: any;

  name = computed(() => this.features?.properties?.['name'] ?? null);
  category = computed(() => this.features?.properties?.['category'] ?? null);

  ngOnInit() {
    console.log(this.features);
  }

  closePopup() {
    console.log('closing')
  }
}
