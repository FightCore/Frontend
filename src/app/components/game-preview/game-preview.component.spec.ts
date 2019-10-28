import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePreviewComponent } from './game-preview.component';

describe('GamePreviewComponent', () => {
  let component: GamePreviewComponent;
  let fixture: ComponentFixture<GamePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
