import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from "@angular/platform-browser";
import {Router} from "@angular/router";
import { ApiService } from "../services/api.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor (private title: Title, private api: ApiService, private router: Router){}
  username = "";
  password = "";

  @ViewChild("passwordField") field?: ElementRef;

  ngOnInit() {
    this.title.setTitle("Login")
  }

  showPassword(){
    if (this.field?.nativeElement.type == "password"){
      this.field.nativeElement.type = "text";
    }else if (this.field?.nativeElement.type == "text") {
      this.field.nativeElement.type = "password";
    }
  }

  login(){
    let body = {
      username: this.username,
      password: this.password
    };

    this.api.requestData("/api/auth/login", body)
    .subscribe( (data: any ) => {
      if (data.valid == true){
        sessionStorage.setItem("valid", data.valid.toString());
        sessionStorage.setItem("username", data.username.toString());
        sessionStorage.setItem("email", data.email.toString());
        sessionStorage.setItem("id", data.id.toString());
        sessionStorage.setItem("groups", data.groups.toString());
        sessionStorage.setItem("roles", data.roles.toString());

        this.router.navigate(["/"]);
      } else {
        sessionStorage.setItem("valid", data.valid.toString());
      }
    });


    
  }
}
