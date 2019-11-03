import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPreviewComponent } from './tournament-preview.component';

describe('TournamentPreviewComponent', () => {
  let component: TournamentPreviewComponent;
  let fixture: ComponentFixture<TournamentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
