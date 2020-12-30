import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProfileComponent } from './quote-profile.component';

describe('QuoteProfileComponent', () => {
  let component: QuoteProfileComponent;
  let fixture: ComponentFixture<QuoteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
