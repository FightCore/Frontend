import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotablePlayerEditComponent } from './notable-player-edit.component';

describe('NotablePlayerEditComponent', () => {
  let component: NotablePlayerEditComponent;
  let fixture: ComponentFixture<NotablePlayerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotablePlayerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotablePlayerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
