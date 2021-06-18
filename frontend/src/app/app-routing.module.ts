import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
      path: '',
      canActivate : [AuthGuard],
      data : {
        permission : ''
      },
      component : HomeComponent
    },
    {
      path: 'login',
      canActivate : [AuthGuard],
      data : {
        permission : ''
      },
      component : LoginComponent
    },
    {
      path: 'user',
      canActivate : [AuthGuard],
      data : {
        permission : 'user'
      },
      component : UserViewComponent
    },
    {
      path: 'admin',
      canActivate : [AuthGuard],
      data : {
        permission : 'admin'
      },
      component : AdminViewComponent
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
      relativeLinkResolution: 'legacy',
      paramsInheritanceStrategy: 'always',
      useHash: true,
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }