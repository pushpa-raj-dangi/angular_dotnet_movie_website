import { parseApiError } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { UserCredentials } from './../account.models';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string[] | any = [];

  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
  }

  login(value:UserCredentials){
    this.accountService.login(value).subscribe((value: any) => {
        
      this.accountService.saveToken(value);
      this.router.navigate(['/']);
    }, error => {
      this.error = parseApiError(error);
    }
      );
  }

}
