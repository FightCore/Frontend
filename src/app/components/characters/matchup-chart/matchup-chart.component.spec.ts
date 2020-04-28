import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupChartComponent } from './matchup-chart.component';

describe('MatchupChartComponent', () => {
  let component: MatchupChartComponent;
  let fixture: ComponentFixture<MatchupChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
