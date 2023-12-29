import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpInfo } from 'src/app/models/signup-info';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo?: SignUpInfo ;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor( private route:Router ,private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.firstname,
      this.form.lastname,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.route.navigate(['auth/login'])
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
