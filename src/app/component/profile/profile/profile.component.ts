import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  type: String = 'store';
  constructor() {
    if(localStorage.getItem('role') == 'ROLE_CLIENT'){
      this.type = 'client';
    }else{
      this.type = 'store';
    }
  }

  ngOnInit(): void {
  }

}
