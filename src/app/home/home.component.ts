import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private title: Title){}

  user = "";
  
  ngOnInit() {
    this.title.setTitle("ChatLink")
  }

  // Check if there is a user signed in and get username
  ngDoCheck(){
    this.user = localStorage.getItem("username") ?? "";
  }

}
