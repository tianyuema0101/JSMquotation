import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionQuoteDetailComponent } from './inscription-quote-detail.component';

describe('InscriptionQuoteDetailComponent', () => {
  let component: InscriptionQuoteDetailComponent;
  let fixture: ComponentFixture<InscriptionQuoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionQuoteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionQuoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
