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

    this.api.apiPost("/api/auth/login", body)
    .subscribe( (data: any ) => {
      if (data.valid == true){
        localStorage.setItem("valid", data.valid.toString());
        localStorage.setItem("username", data.username.toString());
        localStorage.setItem("email", data.email.toString());
        localStorage.setItem("id", data.id.toString());
        localStorage.setItem("groups", data.groups.toString());
        localStorage.setItem("highestRole", data.roles[0].toString());

        this.router.navigate(["/"]);
      } else {
        localStorage.setItem("valid", data.valid.toString());
        alert("Incorrect username or password");
      }
    });


    
  }
}
