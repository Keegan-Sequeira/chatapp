import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatapp';
  validUser = false;
  username = "";
  highestRole = "";

  // Check if user is valid
  ngDoCheck(){
    this.validUser = localStorage.getItem("valid") == "true";
    this.username = localStorage.getItem("username") ?? "";
    this.highestRole = localStorage.getItem("highestRole") ?? "";
  }
}
