import { TestBed } from '@angular/core/testing';

import { AdminSlideService } from './admin-slide.service';

describe('AdminSlideService', () => {
  let service: AdminSlideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
