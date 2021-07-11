import { TestBed } from '@angular/core/testing';

import { CompanyVectorService } from './company-vector.service';

describe('CompanyVectorService', () => {
  let service: CompanyVectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyVectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
