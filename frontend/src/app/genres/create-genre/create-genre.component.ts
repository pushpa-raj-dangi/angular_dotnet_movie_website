import { GenresService } from './../genres.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreDto } from '../genre.model';
import { parseApiError } from 'src/app/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css'],
})
export class CreateGenreComponent implements OnInit {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private genreService: GenresService
  ) {}

  errors: string[] = [];
  ngOnInit(): void {}
  error: any;

  savechanges(genreCreate: GenreDto) {
    this.genreService.createGenre(genreCreate).subscribe(
      () => {
        this.router.navigate(['/genres']);
      },
      (error) => {
        this.error = error.error;
        this.openSnackBar();
        this.errors = parseApiError(error);
      }
    );
  }

  openSnackBar() {
    this._snackBar.open(this.error, 'close');
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 1500);
  }
}
