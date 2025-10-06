import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIcon } from './settings-icon';

describe('SettingsIcon', () => {
  let component: SettingsIcon;
  let fixture: ComponentFixture<SettingsIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
