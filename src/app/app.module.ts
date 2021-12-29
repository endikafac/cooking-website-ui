import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';

// User
import { ListUserComponent } from './user/list-user.component';
import { DetailUserComponent } from './user/detail-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { NewUserComponent } from './user/new-user.component';
import { FirstLoginUserComponent } from './user/first-login-user.component';

// Recipe
import { ListRecipeComponent } from './recipe/list-recipe.component';
import { DetailRecipeComponent } from './recipe/detail-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe.component';
import { NewRecipeComponent } from './recipe/new-recipe.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// external
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

/* IMPORT NGX-CHIPS*/
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';


TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Add a new keyword',
      secondaryPlaceholder: 'Add a keyword',
      clearOnBlur : false,
      addOnBlur : false,
      editable: false,
      maxItems:10,
      ripple : true
      // add here other default values for tag-input
  }//,
  //dropdown: {
    //  displayBy: 'my-display-value',
      // add here other default values for tag-input-dropdown
  //}
});

@NgModule({
  declarations: [
    AppComponent,

    ListUserComponent,
    DetailUserComponent,
    EditUserComponent,
    NewUserComponent,
    FirstLoginUserComponent,
    
    ListRecipeComponent,
    DetailRecipeComponent,
    EditRecipeComponent,
    NewRecipeComponent,
    
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    IndexComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    TagInputModule, 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent,]
})
export class AppModule { }
