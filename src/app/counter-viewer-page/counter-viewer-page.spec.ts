import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterViewerPage } from './counter-viewer-page';

describe('CounterViewerPage', () => {
  let component: CounterViewerPage;
  let fixture: ComponentFixture<CounterViewerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterViewerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
