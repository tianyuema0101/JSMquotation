import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionQuoteComponent } from './inscription-quote.component';

describe('InscriptionQuoteComponent', () => {
  let component: InscriptionQuoteComponent;
  let fixture: ComponentFixture<InscriptionQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
