import { TestBed } from '@angular/core/testing';

import { ViaggioRouteService } from './viaggio-route.service';

describe('VectorRouteService', () => {
  let service: ViaggioRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaggioRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
