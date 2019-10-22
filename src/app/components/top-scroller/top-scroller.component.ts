import { Component, OnInit, HostListener } from '@angular/core';
@Component({
  selector: 'app-top-scroller',
  templateUrl: './top-scroller.component.html',
  styleUrls: ['./top-scroller.component.scss']
})
// Source: https://medium.com/@appl4e/scroll-to-top-button-for-angular-99ddeebb8c3a
export class TopScrollerComponent implements OnInit {
  windowScrolled: boolean;
  scrollTop = 10;
  viewButton = 100;
  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > this.viewButton
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < this.scrollTop
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  ngOnInit() {}
}
