import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChipComponent } from './game-chip.component';

describe('GameChipComponent', () => {
  let component: GameChipComponent;
  let fixture: ComponentFixture<GameChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
