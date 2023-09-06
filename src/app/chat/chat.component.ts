import { Component, OnInit, ViewContainerRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../services/api.service';
import { ChannelsComponent } from './channels/channels.component';
import { TalkComponent } from './talk/talk.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  groups = [{name: null, id: null}];
  groupID = 0;
  previous: any = null;
  constructor (private router: Router, private api: ApiService, private vcr: ViewContainerRef, private renderer: Renderer2) {}

  @ViewChild('channelContainer', {read: ViewContainerRef}) channelContainer!: ViewContainerRef;
  @ViewChild('divContainer') divContainer!: ElementRef;

  @ViewChild('talkContainer', {read: ViewContainerRef}) talkContainer!: ViewContainerRef;

  ngOnInit() {
    let loggedIn = localStorage.getItem("valid");
    if (!loggedIn){
      this.router.navigate(["/login"]);
    }

    let getGroups = localStorage.getItem("groups") ?? "[]";
    getGroups = JSON.parse(getGroups);

    this.api.apiPost("/api/user/groups", {groups: getGroups})
    .subscribe( (data: any) =>{
      this.groups = data.groups;
    });
  }

  showChannels(id: any, groupDiv: any){
    this.channelContainer.clear();
    const component = this.channelContainer.createComponent(ChannelsComponent);
    this.divContainer.nativeElement.setAttribute("class", "channels show");
    component.instance.groupID = id;
    component.instance.selectedChannel.subscribe(data => {
      this.channelSelected(data);
    });
    try{
      this.renderer.removeClass(this.previous, "selected");
    } catch{}
    
    this.previous = groupDiv;
    this.renderer.addClass(groupDiv, "selected");
  }

  channelSelected(channel: string){
    this.talkContainer.clear();
    const component = this.talkContainer.createComponent(TalkComponent);
    component.instance.channel = channel;

    console.log("channel from parent " + channel);
  }
}
