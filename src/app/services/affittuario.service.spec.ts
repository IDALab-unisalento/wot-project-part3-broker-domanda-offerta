import { TestBed } from '@angular/core/testing';

import { AffittuarioService } from './affittuario.service';

describe('AffittuarioService', () => {
  let service: AffittuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffittuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
