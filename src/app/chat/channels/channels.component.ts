import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit{
  @Input() groupID = 0;
  group = {
    name: null,
    channels: []
  }

  constructor (private api: ApiService) {}

  ngOnInit() {
    
    this.api.apiPost("/api/groups/info", {id: this.groupID})
    .subscribe( (data: any) => {
      this.group = data;
    });

  }
}
