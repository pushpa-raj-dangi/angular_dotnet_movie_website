import { ActorsService } from './../actors.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css'],
})
export class IndexActorsComponent implements OnInit {
  actors: any;

  columnsToDisplay = ['image', 'name', 'actions'];

  limit = 5;
  currentPage = 1;
  pageSize = 5;
  constructor(
    private actorService: ActorsService,
    public dialog: MatDialog,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadActors();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { condition: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.condition === true) {
        this.actorService.delete(result.id).subscribe(() => {
          this._snack.open('Sucess', 'close', { duration: 500 });
          this.loadActors();
        });
      }
    });
  }

  loadActors() {
    this.actorService
      .getAll(this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.actors = response.body;
        this.limit = response.headers.get('totalAmountOfRecords');
      });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadActors();
  }
}
