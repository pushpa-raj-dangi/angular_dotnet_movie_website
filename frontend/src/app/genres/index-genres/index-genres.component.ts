import { GenreGetDto } from './../genre.model';
import { GenreDto } from 'src/app/genres/genre.model';
import { GenresService } from './../genres.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css'],
})
export class IndexGenresComponent implements OnInit {
  genres: GenreGetDto[] | any;
  columnsToDisplay = ['name', 'actions'];
  constructor(
    private genreSevice: GenresService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  deleteGenre(id: number) {
    alert('Are you sure to delete' + id);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { condition: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.condition === true) {
        this.genreSevice.deleteGenre(result.id).subscribe(() => {
          this.loadGenres();
        });
      }
    });
  }
  loadGenres() {
    this.genreSevice.getGenres().subscribe((x) => (this.genres = x));
  }
}
