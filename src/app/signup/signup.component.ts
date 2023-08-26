import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor (private title: Title){}
  username = "";
  email = "";
  password = "";

  ngOnInit() {
    this.title.setTitle("Signup")
  }
}
