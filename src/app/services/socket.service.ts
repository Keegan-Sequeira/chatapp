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
  initSocket(channel: string, username: string){
    this.socket = io(SERVER_URL);
    this.socket.emit("joinChannel", channel, username);
    return ()=>{this.socket.disconnect();}
  }

  //Emit a message to the socket server
  send(message: string, username: string, photo: string) {
    this.socket.emit("message", message, username, photo);
  }

  //Listen for a message
  getMessage(){
    return new Observable(observer => {
      this.socket.on("message", (data: any) => {observer.next(data)});
    })
  }
  
  notification(){
    return new Observable(observer => {
      this.socket.on("notification", (data: any) => {observer.next(data)});
    })
  }

  userLeft(username: string){
    this.socket.emit("left", username);
  }

  uploadImage(file: any, mimetype: string, username: string, photo: string) {
    this.socket.emit("imageToServer", file, mimetype, username, photo);
  }

  incomingImage(){
    return new Observable(observer => {
      this.socket.on("imageToClient", (data: any) => {observer.next(data)});
    })
  }

  chatHistory(){
    return new Observable(observer => {
      this.socket.on("chatHistory", (data: any) => {observer.next(data)});
    })
  }

  sendPeerID(peerID: string){
    this.socket.emit("newPeerID", peerID);
  }

  getPeerID(){
    return new Observable(observer => {
      this.socket.on("peerID", (data: any) => {observer.next(data)});
    })
  }
}
