import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

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

    this.api.apiPost("/api/user/groups", {groups: getGroups})
    .subscribe( (data: any) =>{
      this.groups = data.groups;
    });
  }

  // function to reload page
  reloadPage(){
    window.location.reload();
  }

  // Create a new group
  createGroup(){
    this.api.apiPost("/api/groups/create", {name: this.name, userId: this.userId})
    .subscribe( (data: any) => {
      if (data.successful == true){
        alert("Group Created Successfully.");
        this.api.apiPost("/api/user/info", {id: this.userId})
        .subscribe( (data: any) => {
          localStorage.setItem("valid", data.valid.toString());
          localStorage.setItem("username", data.username.toString());
          localStorage.setItem("email", data.email.toString());
          localStorage.setItem("id", data.id.toString());
          localStorage.setItem("groups", JSON.stringify(data.groups));
          localStorage.setItem("highestRole", data.roles[0].toString());
          localStorage.setItem("picture", data.picture);
          this.reloadPage();
        });
      }else {
        alert("Couldn't Create a Group");
      }
      
    });
  }

  manage(groupID: any){
    this.router.navigate(["/manage/group/", groupID]);
  }
}
