import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  id: number = 0;
  private sub: any;
  name = "";
  group = {
    name: null,
    channels: []
  }
  users = {
    in: [],
    out: []
  }

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    console.log("start component");

    let validUser = localStorage.getItem("highestRole");

    if (validUser != "GA" && validUser != "SA"){
      this.router.navigate(["/"]);
    }

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 

      this.api.apiPost("/api/groups/info", {id: this.id})
      .subscribe( (data: any) => {
        this.group = data;
      });
      
      this.api.apiPost("/api/groups/getusers", {groupID: this.id})
      .subscribe( (data: any) => {
        this.users = data;
      });
    });
  }

  // function to reload page
  reloadPage(){
    window.location.reload();
  }

  // Create a new channel in the given group
  newChannel(){
    this.api.apiPost("/api/groups/channel/create", {name: this.name, groupID: this.id})
    .subscribe( (data: any) => {
      if (data.successful == true){
        alert("Channel Created Successfully.");
      } else {
        alert("There was an error creating channel.");
      }
      this.reloadPage()
    });
  }
  
  // Delete channel from group
  deleteChannel(channel: string){
    this.api.apiPost("/api/groups/channel/delete", {groupID: this.id, "channel": channel})
    .subscribe( (data:any) => {
      if (data.successful == true){
        alert("Channel Deleted Successfully.")
      } else {
        alert("There was an error deleting channel.")
      }
      this.reloadPage()
    });
  }

  // Remove user from group
  removeUser(user: string){
    this.api.apiPost("/api/groups/removeuser", {username: user, groupID: this.id})
    .subscribe (( data: any) => {
      if (data.successful == true){
        alert("User Removed from Group.")
      } else {
        alert("There was an error removing user.");
      }
      this.reloadPage()
    });
  };

  // Add user to group
  addUser(user: string){
    this.api.apiPost("/api/groups/adduser", {username: user, groupID: this.id})
    .subscribe (( data: any) => {
      if (data.successful == true){
        alert("User Added to Group.")
      } else {
        alert("There was an error adding user.");
      }
      this.reloadPage()
    });
  };

 

}
