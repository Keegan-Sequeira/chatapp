import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.css']
})
export class GroupManagerComponent implements OnInit{

  constructor (private api: ApiService) {}

  groups = [{name: null}];
  name = "";
  userId: any;

  ngOnInit() {
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
      } else {
        alert("Couldn't Create a Group");
      }
    });
  }
}
