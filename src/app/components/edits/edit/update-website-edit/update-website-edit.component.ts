import { Component, OnInit, Input } from '@angular/core';
import { WebsiteResource } from 'src/app/models/resources/websiteResource';
import { CsharpJsonHelper } from 'src/app/helpers/csharp-json-helper';
import { EditDto } from 'src/app/models/edits/edit-dto';

@Component({
  selector: 'app-update-website-edit',
  templateUrl: './update-website-edit.component.html',
  styleUrls: ['./update-website-edit.component.scss']
})
export class UpdateWebsiteEditComponent implements OnInit {
  @Input() editDto: EditDto;

  constructor() { }
  website: WebsiteResource;

  ngOnInit(): void {
    this.website = CsharpJsonHelper.parseUpperCaseObject(this.editDto.target);
  }
}
