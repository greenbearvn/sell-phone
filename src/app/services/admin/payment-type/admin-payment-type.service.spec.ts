import { TestBed } from '@angular/core/testing';

import { AdminPaymentTypeService } from './admin-payment-type.service';

describe('AdminPaymentTypeService', () => {
  let service: AdminPaymentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPaymentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
