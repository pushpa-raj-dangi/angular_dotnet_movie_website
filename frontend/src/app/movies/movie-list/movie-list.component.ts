import { MoviesService } from './../movies.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  @Input()
  movies: any = [];

  @Output()
  onDelete = new EventEmitter<void>();
  constructor(private movieSerivce:MoviesService,  public dialog: MatDialog,
    private _snack: MatSnackBar) {}

  ngOnInit(): void {}
  
  
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { condition: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.condition === true) {
        this.movieSerivce.delete(result.id).subscribe(() => {
          this._snack.open('Deleted Sucess', 'close', { duration: 500 });
        });
      }
    });
  }



}
