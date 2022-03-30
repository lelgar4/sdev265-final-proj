import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RecipeCreateDialog, UserInformationComponent } from 'src/app/components/user-information/user-information.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [RecipeCreateDialog],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
  ],
  bootstrap: [UserInformationComponent]
})
export class UserModule { }
