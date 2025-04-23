import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardiaEjemplopGuard } from './guardia-ejemplop.guard';

describe('guardiaEjemplopGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardiaEjemplopGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
