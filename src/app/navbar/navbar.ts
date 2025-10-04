import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

import { ModalService } from '../core/services/modal-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  modalService: ModalService = inject(ModalService);

  openModal() {
    this.modalService.open();
  }
}
