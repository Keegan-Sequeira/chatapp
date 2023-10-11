import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ApiService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
