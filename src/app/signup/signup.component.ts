import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor (private title: Title, private apiService: ApiService, private router: Router){}
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
      this.error?.nativeElement.setAttribute("class", "error hide");
    } else {
      valid = false;
      this.error?.nativeElement.setAttribute("class", "error");
    }

    let hashtag = /(@)/g;

    if (this.email.match(hashtag)){
      this.emailError?.nativeElement.setAttribute("class", "error hide");
    } else {
      valid = false;
      this.emailError?.nativeElement.setAttribute("class", "error");
    }

    if (valid) {
      console.log("Create new user. Sending HTTP Request");
      let body = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      this.apiService.apiPost("/api/signup", body)
      .subscribe ( (data: any) =>{
        if (data.valid == true){
          localStorage.setItem("valid", data.valid.toString());
          localStorage.setItem("username", data.username.toString());
          localStorage.setItem("email", data.email.toString());
          localStorage.setItem("id", data.id.toString());
          localStorage.setItem("groups", JSON.stringify(data.groups));
          localStorage.setItem("highestRole", data.roles[0].toString());
          localStorage.setItem("picture", data.picture);
          this.router.navigate(["/"]);
        } else {
          alert("Username already exists.");
        }
      });

    }

  }
}
