import { TestBed } from '@angular/core/testing';

import { ClientDetailService } from './client-detail.service';

describe('ClientDetailService', () => {
  let service: ClientDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
