import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWarning } from './button-warning';

describe('ButtonWarning', () => {
  let component: ButtonWarning;
  let fixture: ComponentFixture<ButtonWarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWarning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWarning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
