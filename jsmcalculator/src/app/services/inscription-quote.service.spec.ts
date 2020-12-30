import { TestBed } from '@angular/core/testing';

import { InscriptionQuoteService } from './inscription-quote.service';

describe('InscriptionQuoteService', () => {
  let service: InscriptionQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
