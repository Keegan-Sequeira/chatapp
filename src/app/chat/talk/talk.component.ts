import { Component, Input, OnInit } from '@angular/core';
import { PeerService } from 'src/app/services/peer.service';
import { SocketService } from 'src/app/services/socket.service';

interface MessageData {
  message: string,
  username: string,
  photo: string
}

interface Chat {
  username: string,
  photo: string,
  type: string,
  message?: string,
  image?: string,
  mimetype?: string
}

function _arrayBufferToBase64( buffer: ArrayBuffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
     binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

interface VideoElement{
  muted: boolean,
  srcObject: MediaStream,
  userId: string
}

const gumOptions = {
  audio: true,
  video: {
    width: {ideal: 640},
    height: {ideal: 360}
  }
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
  username: string = "";
  picture: string = "";
  notification: any;
  notifications: string[] = [];
  selectedFile: any = null;
  incomingFiles: any;
  chatHistory: any;
  chatMessages: Chat[] = [];

  peerList: string[] = [];
  videos: VideoElement[] = [];
  currentStream: any;
  isCallStarted: boolean = false;
  currentCall: any;


  constructor(private socketService: SocketService, private peerService: PeerService) {}

  ngOnInit(){
    this.username = localStorage.getItem("username") ?? "";
    this.picture = localStorage.getItem("picture") ?? "";
    this.initIoConnection();
    this.initPeerJS();
    
  }

  private initPeerJS(){
    this.socketService.getPeerID()
    .subscribe( (data: any) => {
      if (data != this.peerService.myPeerId){
        console.log(data);
        this.peerList.push(data);
      }
    })

    this.streamCamera();
  }

  private addMyVideo(stream: MediaStream){
    this.videos.push({
      muted: true,
      srcObject: stream,
      userId: this.peerService.myPeerId
    });
  }

  private addOtherUserVideo(userId: string, stream: MediaStream) {
    let newVideo = {
      muted: false,
      srcObject: stream,
      userId
    }
    let existing = false;
    this.videos.forEach((v, i, newVideos) => {
      if (v.userId == userId){
        existing = true;
        newVideos[i] = newVideo;
      }
    })
    if (existing == false){
      this.videos.push(newVideo);
    }
  }

  async streamCamera(){
    this.currentStream = await navigator.mediaDevices.getUserMedia(gumOptions);
    this.addMyVideo(this.currentStream);
    if (this.peerService.myPeer.disconnected) {
      await this.peerService.myPeer.reconnect();
    }
    this.socketService.sendPeerID(this.peerService.myPeerId);
  }


  private initIoConnection(){
    this.socketService.initSocket(this.channel, this.username);
    this.ioConnection = this.socketService.getMessage()
    .subscribe((data: any) => {
      this.chatMessages.push({username: data.username, photo: data.photo, type: "message", message: data.message});
    });

    this.notification = this.socketService.notification()
    .subscribe((data: any) => {
      this.notifications.push(data);
    });

    this.incomingFiles = this.socketService.incomingImage()
    .subscribe( (data: any) => {
      this.chatMessages.push({username: data.username, photo: data.photo, type: "image", image: _arrayBufferToBase64(data.file), mimetype: data.mimetype});
    })

    this.chatHistory = this.socketService.chatHistory()
    .subscribe( (data: any) => {
      for (let i of data) {
        this.chatMessages.push({username: i.username, photo: i.photo, type: "message", message: i.message});
      }
    })
  }

  send(){
    if (this.messageContent){
      this.socketService.send(this.messageContent, this.username, this.picture);
      this.messageContent = "";
    } else {
      
    }
  }

  ngOnDestroy(){
    this.socketService.userLeft(this.username);
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  sendImage(){
    this.socketService.uploadImage(this.selectedFile, this.selectedFile.type, this.username, this.picture);
  }
}
