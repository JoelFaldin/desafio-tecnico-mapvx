import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIcon } from './check-icon';

describe('CheckIcon', () => {
  let component: CheckIcon;
  let fixture: ComponentFixture<CheckIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
