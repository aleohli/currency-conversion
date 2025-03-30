import { TestBed } from '@angular/core/testing';

import { ConverterFacadeService } from './converter-facade.service';

describe('ConverterFacadeService', () => {
  let service: ConverterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
