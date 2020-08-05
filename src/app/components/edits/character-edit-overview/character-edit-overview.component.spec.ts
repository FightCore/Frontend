import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEditOverviewComponent } from './character-edit-overview.component';

describe('CharacterEditOverviewComponent', () => {
  let component: CharacterEditOverviewComponent;
  let fixture: ComponentFixture<CharacterEditOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterEditOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterEditOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
