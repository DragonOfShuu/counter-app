import { TestBed } from '@angular/core/testing';

import { CounterInterfaceService } from './counter-interface-service';

describe('CounterInterface', () => {
  let service: CounterInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
