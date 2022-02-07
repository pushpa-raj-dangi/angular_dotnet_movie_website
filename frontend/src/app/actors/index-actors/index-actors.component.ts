import { ActorsService } from './../actors.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  actors:any;

  columnsToDisplay = ['name', 'actions'];
  constructor(private actorService:ActorsService, public dialog: MatDialog) { }

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
        // this.actorService.deleteGenre(result.id).subscribe(() => {
        //   this.loadActors();
        // });
      }
    });
  }

  loadActors(){
    this.actorService.getAll().subscribe(actors=>{
      this.actors = actors;
    })
  }

}
