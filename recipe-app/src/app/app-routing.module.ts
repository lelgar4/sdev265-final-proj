import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo:'',
    pathMatch:'full',
  },
  {
    path:'recipe-builder',
    loadChildren: () => import ('./modules/recipe-builder/recipe-builder.module').then(mod => mod.RecipeBuilderModule)
  },
  {
    path:'login',
    loadChildren: () => import ('./modules/login/login.module').then(mod => mod.LoginModule)
  },
  {
    path:'checklist',
    loadChildren: () => import ('./modules/checklist/checklist.module').then(mod => mod.ChecklistModule)
  },
  {
    path:'user',
    loadChildren: () => import ('./modules/user/user.module').then(mod => mod.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
