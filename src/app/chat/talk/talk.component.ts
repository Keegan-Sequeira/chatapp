import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})
export class TalkComponent implements OnInit{
  @Input() channel = "";
  messageContent: string = "";
  ioConnection: any;
  messages: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(){
    this.initIoConnection();
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
    .subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  send(){
    if (this.messageContent){
      this.socketService.send(this.messageContent);
      this.messageContent = "";
    } else {
      
    }
  }
}
