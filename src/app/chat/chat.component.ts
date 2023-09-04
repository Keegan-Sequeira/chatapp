import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  constructor (private router: Router) {}

  ngOnInit() {
    let loggedIn = localStorage.getItem("valid");
    if (!loggedIn){
      this.router.navigate(["/login"]);
    }
  }
}
