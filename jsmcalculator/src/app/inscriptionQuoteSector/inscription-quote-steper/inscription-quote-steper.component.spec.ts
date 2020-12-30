import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionQuoteSteperComponent } from './inscription-quote-steper.component';

describe('InscriptionQuoteSteperComponent', () => {
  let component: InscriptionQuoteSteperComponent;
  let fixture: ComponentFixture<InscriptionQuoteSteperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionQuoteSteperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionQuoteSteperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
