import { TestBed } from '@angular/core/testing';

import { CounterManagerService } from './counter-manager-service';

describe('CounterManagerService', () => {
  let service: CounterManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
