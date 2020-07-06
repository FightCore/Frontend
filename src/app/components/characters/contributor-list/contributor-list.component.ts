import { Component, OnInit, Input } from '@angular/core';
import { Contributor } from 'src/app/models/contributor';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { Router } from '@angular/router';
import { ContributorType } from 'src/app/models/contributors/contributor-type';

@Component({
  selector: 'app-contributor-list',
  templateUrl: './contributor-list.component.html',
  styleUrls: ['./contributor-list.component.scss'],
})
export class ContributorListComponent implements OnInit {
  @Input() contributors: Contributor[];
  contributorsEdit: Contributor[];
  contributorsModerator: Contributor[];
  constructor(private router: Router) {}

  ngOnInit() {
    this.contributorsEdit = this.contributors.filter(
      (contributor) =>
        contributor.contributorType === ContributorType.contributor
    );

    this.contributorsModerator = this.contributors.filter(
      (contributor) => contributor.contributorType === ContributorType.moderator
    );
  }

  viewUser(userId: number): void {
    this.router.navigate([StaticRoutes.viewUserNoId, userId]);
  }
}
