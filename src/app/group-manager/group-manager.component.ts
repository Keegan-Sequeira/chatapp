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

  ngOnInit() {
    let getGroups = localStorage.getItem("groups") ?? "[]";
    getGroups = JSON.parse(getGroups);
    
    this.api.apiPost("/api/user/groups", {groups: getGroups})
    .subscribe( (data: any) =>{
      this.groups = data.groups;
    });
  }
}
