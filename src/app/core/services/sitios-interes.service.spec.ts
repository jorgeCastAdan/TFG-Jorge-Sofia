import { TestBed } from '@angular/core/testing';

import { SitiosInteresService } from './sitios-interes.service';

describe('SitiosInteresService', () => {
  let service: SitiosInteresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitiosInteresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
