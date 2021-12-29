import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from '../models/recipe';
import { TokenService } from '../service/token.service';
import { RecipeService } from '../service/recipe.service';
import { Keyword } from '../models/keyword';
import { KeywordService } from '../service/keyword.service';
import { CommentService } from '../service/comment.service';
import { VwCommentService } from '../service/vwcomment.service';
import { Comment } from '../models/comment';
import { VwComment } from '../models/vwcomment';
import { TagModel } from 'ngx-chips/core/tag-model';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  user: User = new User("", "", "", "", "", []);
  newPassword: string;
  newPasswordConfirmation: string;
  recipe: Recipe = new Recipe(this.user, "", "", [], []);
  recipeOld: Recipe = new Recipe(this.user, "", "", [], []);
  username = '';
  selectedKeywords: string[];
  keyword: Keyword = new Keyword("", 1, 0);
  itemsKeywords: Keyword[];
  keywordsIsEmpty:boolean = false;
  keywordsOld: Keyword[];

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private keywordService: KeywordService,
    private commentService: CommentService,
    private vwCommentService: VwCommentService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
  ) { }



  ngOnInit() {
    this.username = this.tokenService.getUserName();
    let paramsAux = this.activatedRoute.snapshot.params;
    const id = paramsAux["id"];
    this.getAuthenticatedUser();
  }

  onCreate(): void {
    let paramsAux = this.activatedRoute.snapshot.params;
    const id = paramsAux["id"];
    this.recipe.user = this.user;
    this.recipe.auCreationUser = this.user.id;
    this.recipe.auCreationDate = Date.now();

    //this.keywordsOld = this.recipeOld.keywords;
    //this.deleteOldKeywords();

    //this.recipe.auModificationUser = this.user.id;

    
    this.recipeService.save(this.recipe)
    .pipe(finalize( () => this.volver()))
    .subscribe(
      data => {
        this.toastr.success('Recipe created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
      }
    );
  }

  

  volver(): void {
    this.router.navigate(['/recipe/list']);
  }

  getAuthenticatedUser(): void{
    this.authService.detailUsername(this.username).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        //this.router.navigate(['/']);
        this.volver();
      }
    );
  }

 

  onTagAdded(event: TagModel): void {
    var keywordAuxObj:any = {}
    keywordAuxObj = event;
    var propertyValue: string = "";
    propertyValue = keywordAuxObj.keyword;
    var keywordAux = new Keyword(propertyValue, this.user.id, Date.now());
    this.recipe.keywords.push(keywordAux);
    this.keywordsIsEmpty = (this.recipe.keywords.length===0);
    //console.log("add - keywordsIsEmpty->",this.keywordsIsEmpty);
    //console.log("add - this.recipe.keywords->",this.recipe.keywords);
  }

  onTagRemoved(event: TagModel): void {
    var keywordAuxObj:any = {}
    keywordAuxObj = event;
    var propertyValue: string = "";
    propertyValue = keywordAuxObj.id;
    var keywordAux = new Keyword(propertyValue, this.user.id, keywordAuxObj.auCreationDate);
    var i = this.recipe.keywords.indexOf(keywordAuxObj.id.toString());
    //console.log("remove - >",i)
    this.recipe.keywords.splice(i);
    this.keywordsIsEmpty = (this.recipe.keywords.length===0);
   // console.log("remove - keywordsIsEmpty->",this.keywordsIsEmpty);
    //console.log("remove -this.recipe.keywords->",this.recipe.keywords);
  }


 
  deleteOldKeywords() :void{
    for (let i = 0; i < this.keywordsOld.length; i++) {
      var keyword:Keyword = this.keywordsOld[i];
      this.deleteKeyword(keyword.id, 1);
    }
  }

  deleteKeyword(id:number, type:number) : void {
    this.keywordService.delete(id).subscribe(
      data => {
        if (type === 2){
          this.toastr.success('Keyword deleted', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.ngOnInit();
        }
      },
      err => {
        console.log("ERROR",err.error.mensaje);
      }
    );  
  }


  formatDate (dateNumber: number): string{
    var date = new Date(dateNumber);
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
    return date.toLocaleString('sv-SE', { timeZone: 'UTC' });
  }

}
