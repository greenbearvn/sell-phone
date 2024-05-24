import { TestBed } from '@angular/core/testing';

import { AdminNewsTypeService } from './admin-news-type.service';

describe('AdminNewsTypeService', () => {
  let service: AdminNewsTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminNewsTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
