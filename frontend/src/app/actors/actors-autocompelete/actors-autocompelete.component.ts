import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  selectedActors: any = [];
  columnsToDisplay: any = ['picture', 'name', 'character', 'actions'];
  @ViewChild(MatTable) table: MatTable<any> | any;
  actors = [
    {
      name: 'Tom holland',
      picture:
        'https://media.gq-magazine.co.uk/photos/60379abff70f2de7ce07c306/master/w_1600,c_limit/04-21_TH_Online4.jpg',
    },
    {
      name: 'Harry porter',
      picture:
        'https://media.gq-magazine.co.uk/photos/60379abff70f2de7ce07c306/master/w_1600,c_limit/04-21_TH_Online4.jpg',
    },
  ];
  originalsActor = this.actors;

  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value: any) => {
      this.actors = this.originalsActor;
      this.actors = this.actors.filter(
        (actor) => actor.name.indexOf(value) !== -1
      );
    });
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');
    console.log(event.option.value);
  }
  remove(element: any) {
    const index = this.selectedActors.findIndex(
      (a: any) => a.name === element.name
    );
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedActors.findIndex(
      (a: any) => a === event.item.data
    );
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
  }
}
