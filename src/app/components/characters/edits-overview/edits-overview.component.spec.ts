import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsOverviewComponent } from './edits-overview.component';

describe('EditsOverviewComponent', () => {
  let component: EditsOverviewComponent;
  let fixture: ComponentFixture<EditsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
