import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.css']
})
export class GroupManagerComponent implements OnInit{

  constructor (private api: ApiService, private router: Router) {}

  groups = [{name: null, id: null}];
  name = "";
  userId: any;

  ngOnInit() {

    let validUser = localStorage.getItem("highestRole");

    if (validUser != "GA" && validUser != "SA"){
      this.router.navigate(["/"]);
    }

    let getGroups = localStorage.getItem("groups") ?? "[]";
    getGroups = JSON.parse(getGroups);
    this.userId = localStorage.getItem("id");
    
    this.api.apiPost("/api/groups/user", {groups: getGroups})
    .subscribe( (data: any) =>{
      this.groups = data.groups;
    });
  }

  createGroup(){
    this.api.apiPost("/api/groups/create", {name: this.name, userId: this.userId})
    .subscribe( (data: any) => {
      if (data.successful == true){
        alert("Group Created Succesfully.");
        this.api.apiPost("/api/user/info", {id: this.userId})
        .subscribe( (data: any) => {
          localStorage.setItem("valid", data.valid.toString());
          localStorage.setItem("username", data.username.toString());
          localStorage.setItem("email", data.email.toString());
          localStorage.setItem("id", data.id.toString());
          localStorage.setItem("groups", JSON.stringify(data.groups));
          localStorage.setItem("highestRole", data.roles[0].toString());
        });
      }else {
        alert("Couldn't Create a Group");
      }
      window.location.reload();
    });
  }

  manage(groupID: any){
    this.router.navigate(["/manage/group/", groupID]);
  }
}
