import { MatSnackBar } from '@angular/material/snack-bar';
import { Theater } from './../theater.model';
import { TheatersService } from './../theaters.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';

@Component({
  selector: 'app-index-theaters',
  templateUrl: './index-theaters.component.html',
  styleUrls: ['./index-theaters.component.css']
})
export class IndexTheatersComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'location', 'actions'];
  theaters: Theater[] | any = [];
  constructor(private theaterService:TheatersService, private snack:MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTheaters();
  }

    openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { condition: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.condition === true) {
        this.theaterService.deleteTheater(result.id).subscribe(() => {
          this.snack.open('Sucess', 'close', { duration: 500 });
          this.loadTheaters();
        }, error => {
          this.snack.open(error.error.message, 'X', { duration: 3000 });
        }
          );
      }
    });
  }

  loadTheaters() {
    this.theaterService.getTheaters().subscribe(data => {
      this.theaters = data;
      console.log(this.theaters);
      
      
    }, error => {
      this.snack.open(error.error.message, 'X', {duration:3000});
    });
  } 

}
