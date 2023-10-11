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
  noCamera = false;

  mic: boolean = true;
  cam: boolean = true;
  muteMicMessage: string = "Turn Off Microphone";
  muteCamMessage: string = "Turn Off Camera";
  micColor: string = "btn-danger";
  camColor: string = "btn-danger";


  constructor(private socketService: SocketService, private peerService: PeerService) {}

  ngOnInit(){
    this.username = localStorage.getItem("username") ?? "";
    this.picture = localStorage.getItem("picture") ?? "";
    this.initIoConnection();
    this.initPeerJS();
    
  }

  // Initialise peer js connection and get camera access
  private initPeerJS(){
    this.socketService.getPeerID()
    .subscribe( (data: any) => {
      if (data != this.peerService.myPeerId){
        console.log(data);
        this.peerList.push(data);

        this.initiateVideoCall(data);
      }
    })

    this.streamCamera();

    this.peerService.myPeer.on('call', (call: any) => {
      // Answer the call and add the remote stream to the video element
      call.answer(this.currentStream);
      call.on('stream', (remoteStream: any) => {
        this.addOtherUserVideo(call.peer, remoteStream);
      });
    });
  }

  // Create video call
  initiateVideoCall(userId: string) {
    const call = this.peerService.myPeer.call(userId, this.currentStream);
    call.on('stream', (remoteStream: any) => {
      this.addOtherUserVideo(userId, remoteStream);
    });
  }

  // Add user's video to array
  private addMyVideo(stream: MediaStream){
    this.videos.push({
      muted: true,
      srcObject: stream,
      userId: this.peerService.myPeerId
    });
  }

  // Add other user's videos to array
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

  // Get camera and microphone input
  async streamCamera(){
    this.currentStream = await navigator.mediaDevices.getUserMedia(gumOptions).catch(e => {
      this.noCamera = true;
    });

    if (this.currentStream) {
      this.addMyVideo(this.currentStream);
    }
    if (this.peerService.myPeer.disconnected) {
      await this.peerService.myPeer.reconnect();
    }
    this.socketService.sendPeerID(this.peerService.myPeerId);
    

  }

  // Initialise socket connection and subscribe to observables
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

  // Send a new message in chat
  send(){
    if (this.messageContent){
      this.socketService.send(this.messageContent, this.username, this.picture);
      this.messageContent = "";
    } else {
      
    }
  }

  // Disconnect socket connection
  ngOnDestroy(){
    this.socketService.userLeft(this.username);
  }

  // When user selects a file from the input
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  // Send image through socket service
  sendImage(){
    this.socketService.uploadImage(this.selectedFile, this.selectedFile.type, this.username, this.picture);
  }

  // Disable microphone input
  muteMic(){
    this.currentStream.getAudioTracks().forEach((track: { enabled: boolean; }) => track.enabled = !track.enabled);
    this.mic = !this.mic;

    if(this.mic) {
      this.muteMicMessage = "Turn Off Microphone";
      this.micColor = "btn-danger";
    } else {
      this.muteMicMessage = "Turn On Microphone";
      this.micColor = "btn-success";
    }
  }

  // Disable video input
  muteCam() {
    this.currentStream.getVideoTracks().forEach((track: {enabled: boolean}) => track.enabled = !track.enabled);

    this.cam = !this.cam;

    if(this.cam) {
      this.muteCamMessage = "Turn Off Camera";
      this.camColor = "btn-danger";
    } else {
      this.muteCamMessage = "Turn On Camera";
      this.camColor = "btn-success";
    }
  }
}
