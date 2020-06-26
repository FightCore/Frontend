import { Component, OnInit, Input } from '@angular/core';
import { EditService } from 'src/app/services/edits/edit.service';
import { EditDto } from 'src/app/models/edits/edit-dto';

@Component({
  selector: 'app-edits-overview',
  templateUrl: './edits-overview.component.html',
  styleUrls: ['./edits-overview.component.scss']
})
export class EditsOverviewComponent implements OnInit {

  constructor(private editService: EditService) { }
  @Input() characterId: number;
  edits: EditDto[];

  displayedColumns: string[] = ['userName', 'original', 'approve', 'deny'];
  ngOnInit(): void {
    this.editService.getEditsForCharacter(this.characterId).subscribe(edits => {
      this.edits = edits;
      console.log(this.edits);
    });
  }

  approvePost(id: number): void {
    this.editService.approveEdit(id).subscribe(_ => {
    });
  }

}
