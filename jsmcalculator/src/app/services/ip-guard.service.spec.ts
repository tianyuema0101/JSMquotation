import { TestBed } from '@angular/core/testing';

import { IpGuard } from './ip-guard.service';

describe('IpGuardService', () => {
  let service: IpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
