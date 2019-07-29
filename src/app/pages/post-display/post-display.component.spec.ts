import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDisplayComponent } from './post-display.component';

describe('PostDisplayComponent', () => {
  let component: PostDisplayComponent;
  let fixture: ComponentFixture<PostDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
