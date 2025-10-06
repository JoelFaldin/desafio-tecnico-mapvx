import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-cell',
  imports: [],
  templateUrl: './details-cell.html',
})
export class DetailsCell {
  @Input() primary!: string;
  @Input() secondary!: string;
  @Input() terciary: string;
}
