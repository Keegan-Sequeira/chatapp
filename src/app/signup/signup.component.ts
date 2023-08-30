import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("passwordField") field?: ElementRef;
  @ViewChild("error") error?: ElementRef;
  @ViewChild("emailError") emailError?: ElementRef;

  ngOnInit() {
    this.title.setTitle("Signup")
  }

  showPassword(){
    if (this.field?.nativeElement.type == "password"){
      this.field.nativeElement.type = "text";
    }else if (this.field?.nativeElement.type == "text") {
      this.field.nativeElement.type = "password";
    }
  }

  signup(){
    // Validate form
    let valid = true;
    let upperCase = /[A-Z]/g;
    let lowerCase = /[a-z]/g;
    let number = /[0-9]/g;

    if (this.password.length >= 8 && this.password.match(upperCase) && this.password.match(lowerCase) && this.password.match(number)){
      valid = true;
      this.error?.nativeElement.setAttribute("class", "error hide");
    } else {
      valid = false;
      this.error?.nativeElement.setAttribute("class", "error");
    }

    let hashtag = /(@)/g;

    if (this.email.match(hashtag)){
      valid = true;
      this.emailError?.nativeElement.setAttribute("class", "error hide");
    } else {
      valid = false;
      this.emailError?.nativeElement.setAttribute("class", "error");
    }

    if (valid) {
      console.log("Create new user");
    }

  }
}
