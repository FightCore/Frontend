import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  version: string = '0.0.3';
  constructor() {}

  ngOnInit() {}

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
