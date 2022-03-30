import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemSelectorComponent,DialogMeasurement } from 'src/app/components/item-selector/item-selector.component';
import { RecipeSelectorComponent } from 'src/app/components/recipe-selector/recipe-selector.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { RecipeBuilderRoutingModule} from './recipe-builder-routing.module'

@NgModule({
  declarations: [ItemSelectorComponent,RecipeSelectorComponent,DialogMeasurement],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    RecipeBuilderRoutingModule
  ],
  bootstrap:[RecipeSelectorComponent]
})
export class RecipeBuilderModule { }
