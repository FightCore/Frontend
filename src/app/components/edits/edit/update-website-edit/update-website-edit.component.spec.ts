import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWebsiteEditComponent } from './update-website-edit.component';

describe('UpdateWebsiteEditComponent', () => {
  let component: UpdateWebsiteEditComponent;
  let fixture: ComponentFixture<UpdateWebsiteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWebsiteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWebsiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
