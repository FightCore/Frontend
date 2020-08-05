import { Component, OnInit, Input } from '@angular/core';
import { EditService } from 'src/app/services/edits/edit.service';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { ToastrService } from 'ngx-toastr';
import { EditType } from 'src/app/models/edits/edit-type';
import { MatDialog } from '@angular/material/dialog';
import { UpdateWebsiteEditComponent } from '../../edits/edit/update-website-edit/update-website-edit.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editable } from 'src/app/models/edits/editable';

@Component({
  selector: 'app-edits-overview',
  templateUrl: './edits-overview.component.html',
  styleUrls: ['./edits-overview.component.scss'],
})
export class EditsOverviewComponent implements OnInit {
  constructor(
    private editService: EditService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  @Input() characterId: number;
  @Input() isContributor: boolean;
  @Input() readOnly = false;
  @Input() edits: EditDto[];

  ngOnInit(): void {}

  get displayedColumns(): string[] {
    return this.readOnly
      ? ['userName', 'type', 'original']
      : ['userName', 'type', 'original', 'approve', 'edit', 'deny'];
  }

  approvePost(edit: EditDto): void {
    this.editService.approveEdit(edit.id).subscribe((_) => {
      this.edits.splice(this.edits.indexOf(edit), 1);
      this.toastrService.success('Approved the edit.');
    });
  }

  update(edit: EditDto): void {
    if (edit.editable === Editable.website) {
      const dialog = this.dialog.open(UpdateWebsiteEditComponent, {
        width: '500px',
      });

      dialog.componentInstance.editDto = edit;
    } else if (edit.editable === Editable.player) {
      const dialog = this.dialog.open(UpdateWebsiteEditComponent, {
        width: '500px',
      });

      dialog.componentInstance.editDto = edit;
    }
  }

  reject(edit: EditDto): void {
    this.editService.rejectEdit(edit.id).subscribe((_) => {
      this.edits.splice(this.edits.indexOf(edit), 1);
      this.toastrService.success('Rejected the edit.');
    });
  }

  getEditType(editType: EditType): string {
    return EditType[editType];
  }

  isEdit(edit: EditDto): boolean {
    return this.authService.id === edit.userId;
  }
}
