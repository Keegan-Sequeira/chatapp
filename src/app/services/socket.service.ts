import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from "socket.io-client";
const SERVER_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  
  constructor() { }

  // Set up connection to socket server
  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  //Emit a message to the socket server
  send(message: string) {
    this.socket.emit("message", message);
  }

  //Listen for a message
  getMessage(){
    return new Observable(observer => {
      this.socket.on("message", (data: any) => {observer.next(data)});
    })
  }
}
