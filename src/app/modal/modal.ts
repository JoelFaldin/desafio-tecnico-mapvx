import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  @Output() close = new EventEmitter<void>();

  onFileSelected(event: any) {
    console.log('test')
  }
}
