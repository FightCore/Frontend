import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopScrollerComponent } from './top-scroller.component';

describe('TopScrollerComponent', () => {
  let component: TopScrollerComponent;
  let fixture: ComponentFixture<TopScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
