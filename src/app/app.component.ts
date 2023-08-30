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

  // Check if user is valid
  ngDoCheck(){
    this.validUser = sessionStorage.getItem("valid") == "true";
    this.username += sessionStorage.getItem("username");
  }
}
