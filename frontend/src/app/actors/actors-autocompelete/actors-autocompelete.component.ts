import { ActorsService } from './../actors.service';
import { ActorsMovieDto } from './../actor.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-actors-autocompelete',
  templateUrl: './actors-autocompelete.component.html',
  styleUrls: ['./actors-autocompelete.component.css'],
})
export class ActorsAutocompeleteComponent implements OnInit {
  control: FormControl | any = new FormControl();

  @Input()
  selectedActors: ActorsMovieDto[] | any = [];

  actorsToDisplay:ActorsMovieDto[]=[];




  columnsToDisplay = ['picture', 'name', 'character', 'actions']

  @ViewChild(MatTable)
  table: MatTable<any> | any;

  constructor(private actorsService:ActorsService) {

  }
  ngOnInit(): void {
    this.control.valueChanges.subscribe((value:any) => {
      this.actorsService.searchByName(value).subscribe(actors => {
        console.log("actors",actors);

        this.actorsToDisplay = actors;
      });
    })
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);

    this.control.patchValue('');

    if (this.selectedActors.findIndex((x:any) => x.id == event.option.value.id) !== -1){
      return;
    }

    this.selectedActors.push(event.option.value);
    if (this.table !== undefined){
      this.table.renderRows();
    }
  }

  remove(actor:any){
    const index = this.selectedActors.findIndex((a:any) => a.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>){
    const previousIndex = this.selectedActors.findIndex((actor:any) => actor === event.item.data);
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
