import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'token';
const AUTHORITIES_KEY = 'roles';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor(private route:Router) { }
  signOut() {
    window.sessionStorage.clear();
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
 
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[]  {
    this.roles = [];
    const authoritiesString = sessionStorage.getItem(AUTHORITIES_KEY);
    if (authoritiesString) {
      JSON.parse(authoritiesString).forEach((authority:string) => {
        this.roles.push(authority);
      });
    }
console.log(this.roles)
    return this.roles;
  }
  isLoggedIn(): boolean {
    // Check if the token is present
    return !!sessionStorage.getItem(TOKEN_KEY);
  }
  redirectAfterLogin() {
    const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
    sessionStorage.removeItem('redirectUrl');
    this.route.navigateByUrl(redirectUrl);
  }

  setRedirectUrl(url: string): void {
    sessionStorage.setItem('redirectUrl', url);
  }

  redirectUser(roles:String[]){
    switch( roles[0]){
      case "ROLE_ADMIN" :
        this.route.navigateByUrl('/admin/dashbord')  
        break;
      
      default:
        this.route.navigateByUrl("/client/landing");
    }
  }
}
