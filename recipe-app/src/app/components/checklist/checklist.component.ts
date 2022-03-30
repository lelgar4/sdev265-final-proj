// TODO:
// Connect to DB and access/populate checklists checklists
// Add ability to add new checklists
// add checklist

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

   checklists : string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
