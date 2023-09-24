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
      this.router.navigate(["/login"]);
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

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  updateProfile(){
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    fd.append("userID", this.userID);
    console.log(fd);
    this.api.imgUpload(fd).subscribe(res => {
      if (res.data.result == "OK") {
        this.imgpath = res.data.filename;
      } else {
        alert("There was an error uploading image. Please try again later.")
      }
      
    });
  }
}
