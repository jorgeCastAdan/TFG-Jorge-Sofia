import { TestBed } from '@angular/core/testing';

import { ServicioEjemplopService } from './servicio-ejemplop.service';

describe('ServicioEjemplopService', () => {
  let service: ServicioEjemplopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEjemplopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
