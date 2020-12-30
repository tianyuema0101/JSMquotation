import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionProfileComponent } from './inscription-profile.component';

describe('InscriptionProfileComponent', () => {
  let component: InscriptionProfileComponent;
  let fixture: ComponentFixture<InscriptionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
