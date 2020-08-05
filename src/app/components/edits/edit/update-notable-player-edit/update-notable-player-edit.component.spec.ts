import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotablePlayerEditComponent } from './update-notable-player-edit.component';

describe('UpdateNotablePlayerEditComponent', () => {
  let component: UpdateNotablePlayerEditComponent;
  let fixture: ComponentFixture<UpdateNotablePlayerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNotablePlayerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNotablePlayerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
