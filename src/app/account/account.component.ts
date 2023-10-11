import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: string = "";
  email: string = "";
  role: string ="";
  selectedFile: any = null;
  imgpath: string = "";
  groups = [{name: null, id: null}];
  userID: string = "";

  constructor (private router: Router, private api: ApiService) {}

  ngOnInit(){
    let loggedIn = localStorage.getItem("valid");
    if (!loggedIn){
      this.router.navigate(["/"]);
    }

    this.username = localStorage.getItem("username") ?? "";
    this.email = localStorage.getItem("email") ?? "";
    this.role = localStorage.getItem("highestRole") ?? "";
    this.userID = localStorage.getItem("id") ?? "";

    let groupList = JSON.parse(localStorage.getItem("groups") ?? "");

    this.api.apiPost("/api/user/groups", {groups: groupList})
    .subscribe( (data: any) => {
      this.groups = data.groups;
    });
  }

  // This function is triggered when a file is selected by the user. 
  // It takes in an event parameter and assigns the first file in the target files array to the selectedFile variable.
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  // The  updateProfile()  function is responsible for updating the user's profile. 
  updateProfile(){
    if (this.selectedFile){
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      fd.append("userID", this.userID);
      console.log(fd);
      this.api.imgUpload(fd).subscribe(res => {
        if (res.result == "OK") {
          this.imgpath = res.data.filename;
          localStorage.setItem("picture", res.data.filename);
        } else {
          alert("There was an error uploading image. Please try again later.")
        }
      });
    } else {
      alert("Please select a file.");
    }

  }
}
