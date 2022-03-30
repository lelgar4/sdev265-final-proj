import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserInformationComponent } from 'src/app/components/user-information/user-information.component';


const routes: Routes = [
  {
    path:'',
    component:UserInformationComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
