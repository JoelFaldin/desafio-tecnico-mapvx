import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [NgTemplateOutlet],
  templateUrl: './modal.html',
})
export class Modal {
  @Input() content!: TemplateRef<any>;
}
