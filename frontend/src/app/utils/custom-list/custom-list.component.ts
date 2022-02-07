import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit {

  @Input()
  list:any;
  constructor() { }

  ngOnInit(): void {
  }

}
