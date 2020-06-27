import { Component, OnInit, Input } from '@angular/core';
import { EditService } from 'src/app/services/edits/edit.service';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { ToastrService } from 'ngx-toastr';
import { EditType } from 'src/app/models/edits/edit-type';

@Component({
  selector: 'app-edits-overview',
  templateUrl: './edits-overview.component.html',
  styleUrls: ['./edits-overview.component.scss']
})
export class EditsOverviewComponent implements OnInit {

  constructor(
    private editService: EditService,
    private toastrService: ToastrService) { }
  @Input() characterId: number;
  @Input() isContributor: boolean;

  edits: EditDto[];

  displayedColumns: string[] = ['userName', 'type', 'original', 'approve', 'deny'];
  ngOnInit(): void {
    this.editService.getEditsForCharacter(this.characterId).subscribe(edits => {
      this.edits = edits;
      console.log(this.edits);
    });
  }

  approvePost(edit: EditDto): void {
    this.editService.approveEdit(edit.id).subscribe(_ => {
      this.edits.splice(this.edits.indexOf(edit), 1);
      this.toastrService.success('Approved the edit.');
    });
  }

  reject(edit: EditDto): void {
    this.editService.rejectEdit(edit.id).subscribe(_ => {
      this.edits.splice(this.edits.indexOf(edit), 1);
      this.toastrService.success('Rejected the edit.');
    });
  }

  getEditType(editType: EditType): string {
    return EditType[editType];
  }
}
