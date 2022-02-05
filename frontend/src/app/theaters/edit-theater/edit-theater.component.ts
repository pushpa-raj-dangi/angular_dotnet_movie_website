import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css'],
})
export class EditTheaterComponent implements OnInit {
  constructor() {}

  theater = { name: 'theater 1' };
  ngOnInit(): void {}
  saveChanges(theater: any) {}
}
