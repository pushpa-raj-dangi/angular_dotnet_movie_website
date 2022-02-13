import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { UserCredentials } from './../account.models';
import { Component, OnInit } from '@angular/core';
import { parseApiError } from 'src/app/utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors:string[]=[];
  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
  }

  register(userCredentials:UserCredentials){
    this.errors = [];
    this.accountService.register(userCredentials).subscribe(x=>{
      this.accountService.saveToken(x);
      this.router.navigate(['/']);

    }
     ,error=>this.errors = parseApiError(error) );
  }

}
