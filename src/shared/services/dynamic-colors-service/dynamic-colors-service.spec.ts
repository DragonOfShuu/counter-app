import { TestBed } from '@angular/core/testing';

import { DynamicColorsService } from './dynamic-colors-service';

describe('DynamicColorsService', () => {
  let service: DynamicColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
