import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.css']
})
export class AuthorizeViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public isAuthorized() {
    return true;
  }

}
