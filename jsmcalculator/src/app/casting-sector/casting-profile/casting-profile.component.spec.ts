import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingProfileComponent } from './casting-profile.component';

describe('CastingProfileComponent', () => {
  let component: CastingProfileComponent;
  let fixture: ComponentFixture<CastingProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastingProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
