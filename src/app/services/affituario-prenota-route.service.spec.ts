import { TestBed } from '@angular/core/testing';

import { AffituarioPrenotaRouteService } from './affituario-prenota-route.service';

describe('AffituarioPrenotaRouteService', () => {
  let service: AffituarioPrenotaRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffituarioPrenotaRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
