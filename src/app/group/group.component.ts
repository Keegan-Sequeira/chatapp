import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

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

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 

      this.api.apiPost("/api/groups/info", {id: this.id})
      .subscribe( (data: any) => {
        this.group = data;
      });      
   });
  }

  newChannel(){
    this.api.apiPost("/api/groups/channel/create", {name: this.name, groupID: this.id})
    .subscribe( (data: any) => {
      if (data.successful == true){
        alert("Channel Created Successfully.");
      } else {
        alert("There was an error creating channel.");
      }
      window.location.reload();
    });
  }
  
  deleteChannel(channel: string){
    this.api.apiPost("/api/groups/channel/delete", {groupID: this.id, "channel": channel})
    .subscribe( (data:any) => {
      if (data.successful == true){
        alert("Channel Deleted Successfully.")
      } else {
        alert("There was an error deleting channel.")
      }
      window.location.reload();
    });
  }

}
