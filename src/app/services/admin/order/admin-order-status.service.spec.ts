import { TestBed } from '@angular/core/testing';

import { AdminOrderStatusService } from './admin-order-status.service';

describe('AdminOrderStatusService', () => {
  let service: AdminOrderStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrderStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
