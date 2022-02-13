import { UserCredentials } from './../account.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  form:FormGroup | any;

  @Output()
  onSubmit = new EventEmitter<UserCredentials>();

  @Input()
  action:string  = "Register";
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:["",{Validators:[Validators.required, Validators.email]}],
      password:['',{Validators:[Validators.required]}]
    })
  }

  getEmailErrorMessage(){
    var field = this.form.get("email");
    if(field.hasError('required')){
      return "The email field is required.";
    }

    if(field.hasError('email')){
      return "The email is invalid.";
    }
    return "";
  }


}
