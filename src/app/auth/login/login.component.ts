import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginInfo } from 'src/app/models/login-info';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo?: AuthLoginInfo;
  constructor(private authService: AuthService,private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
     console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        if (data.token !== undefined && data.roles !== undefined ) {
        this.tokenStorage.saveToken(data.token);
       // this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log( data)
       this.tokenStorage.redirectUser(this.roles)
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
   );
  }

 
  onSignUpClick(): void {
    this.router.navigate(['auth/register']);
  }
}
