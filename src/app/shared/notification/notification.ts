import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [NgTemplateOutlet],
  templateUrl: './notification.html',
})
export class Notification {
  @Input() content!: TemplateRef<any>;
}
