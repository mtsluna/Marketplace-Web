import { Component } from '@angular/core';
import {TokenService} from './service/token.service';
import {ClientService} from './service/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marketplace';

  constructor(private clientService: ClientService, private tokenService: TokenService) {
  }

  getRefresh(){
    console.log(this.tokenService.getRefreshTokenFromStorage());
  }

  login(){
    this.tokenService.getTokenForLoginHttp('mtsluna', 'sansa123').subscribe((data)=>{
      this.tokenService.saveTokenInStorage(data.token);
      this.tokenService.saveRefreshTokenInStorage(data.refresh_token);
    })
  }

  executeRequest(){
    this.clientService.getAll().subscribe((data)=>{
      console.log(data)
    })
  }

  logout(){
    this.tokenService.saveRefreshTokenInStorage('');
    this.tokenService.saveTokenInStorage('');
  }

}
