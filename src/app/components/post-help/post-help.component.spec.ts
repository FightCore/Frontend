import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHelpComponent } from './post-help.component';

describe('PostHelpComponent', () => {
  let component: PostHelpComponent;
  let fixture: ComponentFixture<PostHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
