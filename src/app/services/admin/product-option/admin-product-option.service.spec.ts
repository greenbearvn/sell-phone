import { TestBed } from '@angular/core/testing';

import { AdminProductOptionService } from './admin-product-option.service';

describe('AdminProductOptionService', () => {
  let service: AdminProductOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
