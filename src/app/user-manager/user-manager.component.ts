import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit{

  GA = [{id: null, username: null, email: null}];
  US = [{id: null, username: null, email: null}];

  constructor(private api: ApiService) {}
  
  ngOnInit() {
    this.api.apiGet("/api/user/list")
    .subscribe( (data: any) => {
      this.GA = data.GA;
      this.US = data.US;
    });
  }

}
