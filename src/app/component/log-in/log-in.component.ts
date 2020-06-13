import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from '@angular/router';
import {User} from "../../model/user";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private tokenService: TokenService
  ) {
  }

  async ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitLogin() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const user = new User()
        user.username = this.loginForm.get('username').value;
        user.password = this.loginForm.get('password').value;
        this.authenticationService.login(user).subscribe(
          data => {
            // login successful so redirect to the lobby and save the tokebs
            this.tokenService.saveTokenInStorage(data.token);
            this.tokenService.saveRefreshTokenInStorage(data.refresh_token);
            this.tokenService.saveUsernameInStorage(data.user.username);
            this.tokenService.saveRoleInStorage(data.user.roles[0]);
            this.router.navigateByUrl('lobby');
          }
        )
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
