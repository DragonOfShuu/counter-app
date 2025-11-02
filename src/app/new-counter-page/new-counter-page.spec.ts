import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCounterPage } from './new-counter-page';

describe('NewCounterPage', () => {
  let component: NewCounterPage;
  let fixture: ComponentFixture<NewCounterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCounterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCounterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
