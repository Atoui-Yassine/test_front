import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guard/role.guard';


const routes: Routes = [
  { path: '', redirectTo: 'client/landing', pathMatch: 'full' }, // Default route
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  canLoad: [RoleGuard],
  data: { role: 'ROLE_user' },
},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  canLoad: [RoleGuard],
  data: { role: 'ROLE_ADMIN' },
},

];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
