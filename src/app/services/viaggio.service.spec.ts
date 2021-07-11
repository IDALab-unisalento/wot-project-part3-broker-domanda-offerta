import { TestBed } from '@angular/core/testing';

import { ViaggioService } from './viaggio.service';

describe('ViaggioService', () => {
  let service: ViaggioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaggioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
