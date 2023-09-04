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
      console.log(this.id);

      this.api.apiPost("/api/groups/info", {id: this.id})
      .subscribe( (data: any) => {
        this.group = data;
        console.log(data);
        console.log(this.group)
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

}
