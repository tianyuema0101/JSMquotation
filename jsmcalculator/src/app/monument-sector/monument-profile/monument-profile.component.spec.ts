import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentProfileComponent } from './monument-profile.component';

describe('MonumentProfileComponent', () => {
  let component: MonumentProfileComponent;
  let fixture: ComponentFixture<MonumentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonumentProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
