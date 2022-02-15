import { UserDto } from './../account.models';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-account',
  templateUrl: './index-account.component.html',
  styleUrls: ['./index-account.component.css']
})
export class IndexAccountComponent implements OnInit {

  users: UserDto[] = [];
  page: number = 1;
  pageSize: number = 10;
  limit: number = 5;

    columnsToDisplay = ["email", "actions"];


  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.getUsers(this.page,this.pageSize).subscribe(
      (x: any) => {
       
        
        this.users = x.headers.get('totalAmountOfRecords');
        
}
    )
  }

  
  makeAdmin(userId: string){
    this.accountService.createAdmin(userId).subscribe(() => {
      // Swal.fire("Success", "The operation was successful", "success");
      console.log("don");
      
    })
  }

  removeAdmin(userId: string){
    this.accountService.removeAdmin(userId).subscribe(() => {
      // Swal.fire("Success", "The operation was successful", "success");
      console.log("don");
      
    })
  }

}
