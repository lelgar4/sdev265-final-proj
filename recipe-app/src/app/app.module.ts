import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { ShareRecipeComponent } from './components/share-recipe/share-recipe.component';
import { MatTab, MatTabsModule } from '@angular/material/tabs';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginComponent,
    PasswordResetComponent,
    ChecklistComponent,
    UserInformationComponent,
    ShareRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    HttpClientModule,
    // MatDialogModule,
    // MatDialogRef,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
