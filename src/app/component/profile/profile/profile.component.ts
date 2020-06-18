import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  type: String = 'store';
  constructor(private tokenService: TokenService) {
    if(this.tokenService.getRoleFromStorage() == 'ROLE_CLIENT'){
      this.type = 'client';
    } else {
      if(this.tokenService.getRoleFromStorage() == 'ROLE_BUSINESS'){
        this.type = 'store';
      }
    }
  }

  ngOnInit(): void {
  }

}
