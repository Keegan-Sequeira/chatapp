import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit{

  GA = [{id: null, username: null, email: null}];
  US = [{id: null, username: null, email: null}];

  constructor(private api: ApiService, private router: Router) {}
  
  ngOnInit() {

    let validUser = localStorage.getItem("highestRole");

    if (validUser != "SA"){
      this.router.navigate(["/"]);
    }

    this.api.apiGet("/api/user/list")
    .subscribe( (data: any) => {
      this.GA = data.GA;
      this.US = data.US;
    });
  }

  reloadPage(){
    window.location.reload();
  }

  promote(user: any, newRank: string){
    this.api.apiPost("/api/user/promote", {userID: user, rank: newRank})
    .subscribe( (data: any) => {
      if (data.successful == true){
        alert("User Modified");
      } else {
        alert("Error. Try Again Later.");
      }
      this.reloadPage();
    });
  }

  demote(user: any) {
    this.api.apiPost("/api/user/demote", {userID: user})
    .subscribe( (data: any) => {
      if (data.successful == true){
        alert("User Modified");
      } else {
        alert("Error. Try Again Later.");
      }
      this.reloadPage();
    });
  }

}
