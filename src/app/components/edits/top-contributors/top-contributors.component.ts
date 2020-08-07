import { Component, OnInit } from '@angular/core';
import { EditService } from 'src/app/services/edits/edit.service';
import { TopContributor } from 'src/app/models/contributors/top-contributor';
import { DataSource } from '@angular/cdk/table';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-top-contributors',
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.scss']
})
export class TopContributorsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'edits'];
  dataSource: DataSource<TopContributor>;
  constructor(private editService: EditService) { }

  ngOnInit(): void {
    this.editService.getTopContributors().subscribe(topContributors => {
      this.dataSource = new ArrayDataSource<TopContributor>(topContributors);
    });
  }

}
