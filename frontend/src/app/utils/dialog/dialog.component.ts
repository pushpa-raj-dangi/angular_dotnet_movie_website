import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/genres/edit-genre/edit-genre.component';
import { GenresService } from 'src/app/genres/genres.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private genreService: GenresService
  ) {}

  onNoClick(): void {
    this.dialogRef.close({ condition: false, id: this.data.id });
  }
  onYesClick() {
    this.dialogRef.close({ condition: true, id: this.data.id });
  }
  ngOnInit(): void {}
}
