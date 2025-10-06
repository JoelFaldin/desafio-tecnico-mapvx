import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef } from '@angular/core';

import { Notification } from '../../shared/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  open(content: TemplateRef<any>) {
    if (this.overlayRef) {
      this.close();
    }

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay
        .position()
        .global()
        .right('20px')
        .bottom('20px')
    });

    const notificationPortal = new ComponentPortal(Notification, null, this.injector);
    const notificationRef = this.overlayRef.attach(notificationPortal);

    notificationRef.instance.content = content;
    this.overlayRef.backdropClick().subscribe(() => this.close());

    const closeTimer = setTimeout(() => {
      this.close();
    }, 5000)
    // 1000ms = 1s

    const clearTimer = () => clearTimeout(closeTimer);
    this.overlayRef.detachments().subscribe(clearTimer);
  }

  close() {
    this.overlayRef.dispose();
    this.overlayRef = undefined;
  }
}
