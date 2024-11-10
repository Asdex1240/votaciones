import { TestBed } from '@angular/core/testing';

import { MetmaskService } from './metmask.service';

describe('MetmaskService', () => {
  let service: MetmaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetmaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
