import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { RecipeService } from '../service/recipe.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user';
import { finalize } from 'rxjs';
import { RecipeFilter } from '../models/recipe-filter';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {

  recipes: Recipe[] = [];
  roles: string[];
  isAdmin = false;
  isChef = false;
  isUser = false;
  isFirstLogin: boolean = false;
  username = '';
  user: User = new User("", "", "", "", "", []);
  maxLengthDescription : number = 250;
  filter: string;
  recipeFilter: RecipeFilter = new RecipeFilter("");
  

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
     

  ) { }

  ngOnInit() {
    this.recipesLoad();
    this.username = this.tokenService.getUserName();
    this.loadUser();
    this.roles = this.tokenService.getAuthorities();
    
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (rol === 'ROLE_CHEF') {
        this.isChef = true;
      }
      if (rol === 'ROLE_USER') {
        this.isUser = true;
      }
    });
    
    
  }

  searchByFilter(){
    this.recipeFilter = new RecipeFilter(this.filter);
    console.log("filter",this.filter);
    console.log("recipeFilter",this.recipeFilter);
    this.recipeService.search(this.recipeFilter)
    //.pipe(finalize( () => this.ngOnInit()))
    .subscribe(
      data => {
        this.recipes = data;
      },
      err => {
        console.log(err);
      }
    );
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
        this.recipesLoad();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  goToEdit(id: number) {
    console.log("this.router",this.router);
    this.router.navigate(['/recipe/edit/'.concat(id.toString())]);
  }

  

  formatDate (dateNumber: number): string{
    var date = new Date(dateNumber);
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
    return date.toLocaleString('sv-SE', { timeZone: 'UTC' });
  }

  loadUser(): void {
    console.log(this.username);
    this.authService.detailUsername(this.username).subscribe(
      data => {
        this.user = data;
        if (!this.user.lastConnection) {
          this.isFirstLogin = true;
        }
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  showDescription(description:string){
    var descriptionAux : string = "";
    if (description){
      if (description.length >= this.maxLengthDescription){
        descriptionAux = description.substring(0, 250);
        descriptionAux = descriptionAux.concat(" (...)");
      } else {
        descriptionAux = description;
      }
    }
    return descriptionAux;
  }

}
