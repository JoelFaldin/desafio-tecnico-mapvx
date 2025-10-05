import { Component, input, Input, output } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  imports: [],
  templateUrl: './button-secondary.html',
})
export class ButtonSecondary {
  label = input('label');
  click = output<void>();

  handleClick() {
    this.click.emit();
  }
}
