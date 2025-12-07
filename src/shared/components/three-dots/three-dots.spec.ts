import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDots } from './three-dots';

describe('ThreeDots', () => {
  let component: ThreeDots;
  let fixture: ComponentFixture<ThreeDots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
