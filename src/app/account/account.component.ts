import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: string = "";
  email: string = "";
  role: string ="";
  groups = [{name: null, id: null}];

  constructor (private router: Router, private api: ApiService) {}

  ngOnInit(){
    let loggedIn = localStorage.getItem("valid");
    if (!loggedIn){
      this.router.navigate(["/login"]);
    }

    this.username = localStorage.getItem("username") ?? "";
    this.email = localStorage.getItem("email") ?? "";
    this.role = localStorage.getItem("highestRole") ?? "";

    let groupList = JSON.parse(localStorage.getItem("groups") ?? "");

    this.api.apiPost("/api/user/groups", {groups: groupList})
    .subscribe( (data: any) => {
      this.groups = data.groups;
      console.log(this.groups);
    });
  }
}
