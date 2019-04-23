import { TestBed, inject } from '@angular/core/testing';

import { ServicechangepwService } from './servicechangepw.service';

describe('ServicechangepwService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicechangepwService]
    });
  });

  it('should be created', inject([ServicechangepwService], (service: ServicechangepwService) => {
    expect(service).toBeTruthy();
  }));
});
