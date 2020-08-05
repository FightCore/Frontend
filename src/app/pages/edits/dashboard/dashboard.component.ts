import { Component, OnInit } from '@angular/core';
import { EditService } from 'src/app/services/edits/edit.service';
import { CharacterEdits } from 'src/app/models/edits/character-edits';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private editService: EditService
  ) { }
  characterEdits: CharacterEdits[];
  ngOnInit(): void {
    this.editService.getAllOpenForUser().subscribe(edits => this.characterEdits = edits);
  }

}
