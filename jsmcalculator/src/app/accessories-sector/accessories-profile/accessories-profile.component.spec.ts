import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesProfileComponent } from './accessories-profile.component';

describe('AccessoriesProfileComponent', () => {
  let component: AccessoriesProfileComponent;
  let fixture: ComponentFixture<AccessoriesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoriesProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
