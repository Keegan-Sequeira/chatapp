import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

interface MessageData {
  message: string,
  username: string,
  photo: string
}


@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})

export class TalkComponent implements OnInit{

  @Input() channel = "";
  messageContent: string = "";
  ioConnection: any;
  messages: MessageData[] = [];
  username: string = "";
  picture: string = "";

  constructor(private socketService: SocketService) {}

  ngOnInit(){
    this.initIoConnection();
    this.username = localStorage.getItem("username") ?? "";
    this.picture = localStorage.getItem("picture") ?? "";
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
    .subscribe((data: any) => {
      this.messages.push(data);
      console.log(data);
    });
  }

  send(){
    if (this.messageContent){
      this.socketService.send(this.messageContent, this.username, this.picture);
      this.messageContent = "";
    } else {
      
    }
  }
}
