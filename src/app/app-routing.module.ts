import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
// User
import { ListUserComponent } from './user/list-user.component';
import { DetailUserComponent } from './user/detail-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { NewUserComponent } from './user/new-user.component';
// Recipe
import { ListRecipeComponent } from './recipe/list-recipe.component';
import { DetailRecipeComponent } from './recipe/detail-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe.component';
import { NewRecipeComponent } from './recipe/new-recipe.component';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';



const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'list', component: ListaProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevo', component: NuevoProductoComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'editar/:id', component: EditarProductoComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'user/list', component: ListUserComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'user/detail/:id', component: DetailUserComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'user/edit/:id', component: EditUserComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'user/new', component: NewUserComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'recipe/list', component: ListRecipeComponent, canActivate: [guard], data: { expectedRol: ['admin','chef', 'user'] } },
  { path: 'recipe/detail/:id', component: ListRecipeComponent, canActivate: [guard], data: { expectedRol: ['chef'] } },
  { path: 'recipe/edit/:id', component: EditRecipeComponent, canActivate: [guard], data: { expectedRol: ['chef'] } },
  { path: 'recipe/new', component: NewRecipeComponent, canActivate: [guard], data: { expectedRol: ['chef'] } },


  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
