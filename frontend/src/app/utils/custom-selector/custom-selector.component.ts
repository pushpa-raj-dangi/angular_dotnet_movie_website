import { Component, Input, OnInit, Output } from '@angular/core';
import { GenreDto } from 'src/app/genres/genre.model';
import { MultiSelector } from './multi-selector.model';

@Component({
  selector: 'app-custom-selector',
  templateUrl: './custom-selector.component.html',
  styleUrls: ['./custom-selector.component.css'],
})
export class CustomSelectorComponent implements OnInit {
  constructor() {}

  @Input()
  selectedItems: MultiSelector[] = [];
  @Input()
  nonSelectedItems: MultiSelector[] = [];

  ngOnInit(): void {}
  selectAll() {
    this.selectedItems.push(...this.nonSelectedItems);
    this.nonSelectedItems = [];
  }
  deSelectAll() {
    this.nonSelectedItems.push(...this.selectedItems);
    this.selectedItems = [];
  }

  select(item: MultiSelector, id: number) {
    this.selectedItems.push(item);
    this.nonSelectedItems.splice(id, 1);
  }
  deSelect(item: MultiSelector, id: number) {
    this.nonSelectedItems.push(item);
    this.selectedItems.splice(id, 1);
  }
}
