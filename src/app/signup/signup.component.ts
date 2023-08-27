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

  ngOnInit() {
    this.title.setTitle("Signup")
  }

  showPassword(){
    if (this.field?.nativeElement.type == "password"){
      this.field.nativeElement.type = "text";
    }else if (this.field?.nativeElement.type == "text") {
      this.field.nativeElement.type = "password";
    }

    console.log(this.field?.nativeElement.type);
  }
}
