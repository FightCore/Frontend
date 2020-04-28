import { Component, OnInit, Input } from '@angular/core';
import { Contributor } from 'src/app/models/contributor';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributor-list',
  templateUrl: './contributor-list.component.html',
  styleUrls: ['./contributor-list.component.scss']
})
export class ContributorListComponent implements OnInit {
  @Input() contributors: Contributor[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewUser(userId: number): void {
    this.router.navigate([StaticRoutes.viewUserNoId, userId]);
  }

}
