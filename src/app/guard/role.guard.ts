import { Injectable } from '@angular/core';
import { ActivatedRoute, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../service/role.service';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {
  constructor(private activatedRoute: ActivatedRoute,private route:Router,private roleService: RoleService, private tokenStorage: TokenStorageService  ) {}

 canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const requiredRole = route.data && route.data['role'];
    const isLoggedIn = this.tokenStorage.isLoggedIn();

      
     

      if (isLoggedIn) {
        if ((requiredRole.toLowerCase() && this.roleService.getUserRole()?.toLowerCase()) === requiredRole.toLowerCase()) {
          return true;
        }
        this.tokenStorage.redirectAfterLogin();
      } 
       
        // this.tokenStorage.setRedirectUrl(this.activatedRoute.snapshot.url.join('/'));
        // // Redirect to the login page
        // this.route.navigateByUrl('auth/login');
        
      
      console.log('Access denied. User does not have the required role.');
      
      return false;
    
  }
}
