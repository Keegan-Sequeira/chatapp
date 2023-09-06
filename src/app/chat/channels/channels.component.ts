import { Component, Input, OnInit, Renderer2 } from '@angular/core';
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
  previous: any = null;

  constructor (private api: ApiService, private renderer: Renderer2) {}

  ngOnInit() {
    
    this.api.apiPost("/api/groups/info", {id: this.groupID})
    .subscribe( (data: any) => {
      this.group = data;
    });

  }

  selectChannel(channel: string, channelDiv: any){

    this.renderer.addClass(channelDiv, "selected");
    try {
      this.renderer.removeClass(this.previous, "selected");
    } catch{}

    this.previous = channelDiv;
  }
}
