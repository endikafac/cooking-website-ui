import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';

// User
import { ListUserComponent } from './user/list-user.component';
import { DetailUserComponent } from './user/detail-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { NewUserComponent } from './user/new-user.component';

// User
import { ListRecipeComponent } from './recipe/list-recipe.component';
import { DetailRecipeComponent } from './recipe/detail-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe.component';
import { NewRecipeComponent } from './recipe/new-recipe.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,

    ListUserComponent,
    DetailUserComponent,
    EditUserComponent,
    NewUserComponent,
    
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
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
