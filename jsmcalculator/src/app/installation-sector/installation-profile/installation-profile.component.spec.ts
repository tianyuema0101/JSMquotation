import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationProfileComponent } from './installation-profile.component';

describe('InstallationProfileComponent', () => {
  let component: InstallationProfileComponent;
  let fixture: ComponentFixture<InstallationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
