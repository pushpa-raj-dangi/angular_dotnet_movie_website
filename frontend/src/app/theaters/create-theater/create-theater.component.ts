import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-theater',
  templateUrl: './create-theater.component.html',
  styleUrls: ['./create-theater.component.css'],
})
export class CreateTheaterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  saveChanges(theater: any) {
    console.log(theater);

  }
}
