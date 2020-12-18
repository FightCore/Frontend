import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/models/tool';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  tools: Tool[] =
  [
    { title: 'FightCore Bot', description: 'The FightCore bot has the biggest frame data database in Melee\'s history',
      source: 'https://github.com/FightCore/Bot', image: 'http://localhost:4200/assets/Fightcore_Logo.svg'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
