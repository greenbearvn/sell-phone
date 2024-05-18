import { TestBed } from '@angular/core/testing';

import { ClientNewsService } from './client-news.service';

describe('ClientNewsService', () => {
  let service: ClientNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
