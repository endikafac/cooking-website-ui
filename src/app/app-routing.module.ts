import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';



const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/list', component: ListUserComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN'] } },
  { path: 'user/detail/:id', component: DetailUserComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN'] } },
  { path: 'user/edit/:id', component: EditUserComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN'] } },
  { path: 'user/new', component: NewUserComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN'] } },
  { path: 'user/fist-login', component: FirstLoginUserComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN','ROLE_CHEF', 'ROLE_USER'] } },
  { path: 'recipe/list', component: ListRecipeComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN','ROLE_CHEF', 'ROLE_USER'] } },
  { path: 'recipe/detail/:id', component: DetailRecipeComponent, canActivate: [guard], data: { expectedRol: ['ROLE_ADMIN','ROLE_CHEF', 'ROLE_USER'] } },
  { path: 'recipe/edit/:id', component: EditRecipeComponent, canActivate: [guard], data: { expectedRol: ['ROLE_CHEF'] } },
  { path: 'recipe/new', component: NewRecipeComponent, canActivate: [guard], data: { expectedRol: ['ROLE_CHEF'] } },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
