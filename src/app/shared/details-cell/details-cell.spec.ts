import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCell } from './details-cell';

describe('DetailsCell', () => {
  let component: DetailsCell;
  let fixture: ComponentFixture<DetailsCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
