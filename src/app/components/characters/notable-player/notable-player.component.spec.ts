import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotablePlayerComponent } from './notable-player.component';

describe('NotablePlayerComponent', () => {
  let component: NotablePlayerComponent;
  let fixture: ComponentFixture<NotablePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotablePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotablePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
