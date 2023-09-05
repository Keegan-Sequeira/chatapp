import { Component, OnInit, ViewContainerRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../services/api.service';
import { ChannelsComponent } from './channels/channels.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  groups = [{name: null, id: null}];
  groupID = 0;
  constructor (private router: Router, private api: ApiService, private vcr: ViewContainerRef, private renderer: Renderer2) {}

  //@ViewChild("channelContainer") channelContainer?: ViewContainerRef;
  @ViewChild('channelContainer', {read: ViewContainerRef}) channelContainer?: ViewContainerRef;

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

  showChannels(id: any){
    this.channelContainer?.clear();
    const component = this.channelContainer?.createComponent(ChannelsComponent);
    component!.instance.groupID = id;
    const componentNativeElement = component?.location.nativeElement;
  }
}
