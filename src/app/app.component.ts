import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FightCore';
  constructor(public overlayContainer: OverlayContainer) { }
  @HostBinding('class') componentCssClass;

  ngOnInit(): void {
    this.testTheme();
  }

  public testTheme() {
    this.overlayContainer.getContainerElement().classList.add('melee-theme');
    this.componentCssClass = 'melee-theme';
  }
}
