import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { Modal } from '../../modal/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private overlayRef?: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) { }

  open() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',      
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const modalPortal = new ComponentPortal(Modal, null, this.injector);

    const modalRef = this.overlayRef.attach(modalPortal);

    modalRef.instance.close.subscribe(() => this.close());
    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
}
