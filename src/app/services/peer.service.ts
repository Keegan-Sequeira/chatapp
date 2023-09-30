import { Injectable } from '@angular/core';
import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  myPeerId = uuidv4();
  myPeer: any;
  streamCamera: any;
  streamScreen: any;

  constructor() {
    this.myPeer = new Peer(this.myPeerId, {
      host: "localhost",
      secure: false,
      port: 3001,
      path: "/"
    })

  }
}
