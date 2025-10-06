import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinIcon } from './pin-icon';

describe('PinIcon', () => {
  let component: PinIcon;
  let fixture: ComponentFixture<PinIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
