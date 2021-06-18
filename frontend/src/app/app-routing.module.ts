import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component : HomeComponent
    },
    {
      path: 'login',
      component : LoginComponent
    },
    {
      path: 'user',
      component : UserViewComponent
    },
    {
      path: 'admin',
      component : AdminViewComponent
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
      relativeLinkResolution: 'legacy',
      paramsInheritanceStrategy: 'always',
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }