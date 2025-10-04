import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, OverlayModule, PortalModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('desafio-tecnico');
}
