import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterCapital } from 'src/app/validators/firstLetterCapital';
import { GenreDto } from '../genre.model';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css'],
})
export class CreateGenreComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  savechanges(genreCreate: GenreDto) {
    console.log(genreCreate);

    this.router.navigate(['/genres']);
  }
}
