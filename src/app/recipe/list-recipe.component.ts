import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { RecipeService } from '../service/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {

  recipes: Recipe[] = [];
  roles: string[];
  isAdmin = false;

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipesLoad();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }


  recipesLoad(): void {
    this.recipeService.list().subscribe(
      data => {
        this.recipes = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id: number) {
    this.recipeService.delete(id).subscribe(
      data => {
        this.toastr.success('Recipe deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
       this.router.navigate(['/recipe-list']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
