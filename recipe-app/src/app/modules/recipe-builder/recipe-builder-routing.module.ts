import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeSelectorComponent } from 'src/app/components/recipe-selector/recipe-selector.component';
const routes: Routes = [
  {
    path:'',
    component:RecipeSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeBuilderRoutingModule { }