import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-warning',
  imports: [],
  templateUrl: './button-warning.html',
})
export class ButtonWarning {
  label = input('label');
  click = output<void>();

  handleClick() {
    this.click.emit();
  }
}
