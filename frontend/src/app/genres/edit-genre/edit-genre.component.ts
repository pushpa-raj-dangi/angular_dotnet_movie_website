import { Component, OnInit, Output } from '@angular/core';
import { GenreDto } from '../genre.model';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css'],
})
export class EditGenreComponent implements OnInit {
  @Output()
  model: GenreDto = { name: 'Drama' };

  constructor() {}

  ngOnInit(): void {}

  saveChanges(genre: GenreDto) {
    console.log(genre);
  }
}
