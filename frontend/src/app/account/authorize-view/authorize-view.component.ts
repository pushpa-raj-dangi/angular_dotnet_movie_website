import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.css']
})
export class AuthorizeViewComponent implements OnInit {

  @Input()
  role:string | any;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  public isAuthorized() {
    if(this.role){
      return this.accountService.getRole() === this.role;
    }else{

      return this.accountService.isAuthenticated();
    }
  }

}
