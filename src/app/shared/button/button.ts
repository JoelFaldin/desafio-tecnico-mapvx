import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  label = input('label');
  customClass? = input('customClass');
  click = output<void>();

  handleClick() {
    this.click.emit();
  }
}
