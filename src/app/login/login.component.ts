import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const headerOptions = {
  headers: new HttpHeaders( { "Content-Type": "application/json" } )
};

const backendURL = "http://localhost:3000";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor (private title: Title, private httpClient: HttpClient){}
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

    console.log(this.field?.nativeElement.type);
  }

  login(){
    let body = {
      username: this.username,
      password: this.password
    };

    this.httpClient.post(backendURL + "/api/auth/login", body, headerOptions)
    .subscribe( (data: any) => {
      if (data.valid == true){
        console.log("success");
        console.log(data.email);
      } else {
        console.log("failed");
        console.log(data);
      }
    })
  }
}
