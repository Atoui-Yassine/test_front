import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'teste_technique';
  roles: string[] | undefined;
  authority: string | undefined;
    constructor(){}
  ngOnInit() {
    // if (this.tokenStorage.getToken()) {
    //   this.roles = this.tokenStorage.getAuthorities();
    //   this.roles.every(role => {
    //     if (role === 'ROLE_ADMIN') {
    //       this.authority = 'admin';
    //       return false;
    //     } else if (role === 'ROLE_PM') {
    //       this.authority = 'pm';
    //       return false;
    //     }
    //     this.authority = 'user';
    //     return true;
    //   });
    // }
  }
}
