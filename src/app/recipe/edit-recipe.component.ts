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
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  user: User = new User("", "", "", "", "", []);
  newPassword: string;
  newPasswordConfirmation: string;
  recipe: Recipe = new Recipe(this.user, "", "", [], []);
  recipeOld: Recipe = new Recipe(this.user, "", "", [], []);
  username = '';
  selectedKeywords: string[];
  keyword: Keyword = new Keyword("", 1, 0);
 // selectedComments: string[];
  comment: Comment = new Comment("", 1, 0);
  comments: VwComment[];
  itemsKeywords: Keyword[];
  keywordsIsEmpty:boolean = false;
  newComment: string;
  commentsOld: Comment[];
  keywordsOld: Keyword[];
  commentEdit = new Map<number, boolean>();

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
    this.loadRecipe(id);
    //this.commentsOld = this.recipeOld.comments;
    //this.keywordsOld = this.recipeOld.keywords;

    console.log("this.recipeOld.keywords",this.recipeOld.keywords);
    this.loadComments(id);
    this.getAuthenticatedUser();
    this.newComment = '';
  }

  onUpdate(): void {
    let paramsAux = this.activatedRoute.snapshot.params;
    const id = paramsAux["id"];

  //  this.keywordsOld = this.recipeOld.keywords;
    console.log("this.recipeOld.keywords",this.recipeOld.keywords);
    console.log("this.recipe.keywords",this.recipe.keywords);
    //this.deleteOldKeywords();
    //this.recipe.user = this.user;
    this.recipe.auModificationUser = this.user.id;
    
    
    this.recipeService.update(id, this.recipe)
    .pipe(finalize( () => this.clean()))
    .subscribe(
      data => {
        
        this.toastr.success('Recipe updated', 'OK', {
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

  clean(): void {
    this.cleanKeyword();
    this.router.navigate(['/recipe/list']);
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

  loadComments(id:number): void{
    this.vwCommentService.detailRecipeId(id).subscribe(
      data => {
        this.comments = data;
        
        for (let i = 0; i < this.comments.length; i++) {
          var comment:VwComment = this.comments[i];
          this.commentEdit.set(comment.id, false);
        }
      },
      err => {
        if (err.error.mensaje !== 'It does not exist') {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        } else {
          console.log("ERROR -->",err.error.mensaje);
          
        }
      }
    );
  }

  canEdit(id:number, option:boolean) : void{
    let isDeleted = this.commentEdit.delete(id);
    this.commentEdit.set(id, true);
  }


/*
  getUserName(id:number): string {
    var nameComplete: string = "";
    console.log("id",id);
    this.authService.detail(id).subscribe(
      data => {
        this.user = data;
        nameComplete =  this.user.firstname.concat(" ").concat(this.user.lastname);
        console.log("nameComplete",nameComplete);
        return nameComplete;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        //this.router.navigate(['/']);
        //this.volver();
      }
    );
    return nameComplete;
  }
*/
  loadRecipe(id:number) : void{
    this.recipeService.detail(id).subscribe(
      data => {
        this.recipe = data;
        this.recipeOld = data;
        console.log("this.recipeOld",this.recipeOld);
        this.keywordsIsEmpty = (this.recipe.keywords.length===0);
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

  editComment(id:number, comment:string) : void {
      this.canEdit(id, false);
      this.comment.comment = comment;
      //this.comment.auCreationUser = this.user.id;
      //this.comment.auCreationDate = Date.now();
      this.comment.auModificationUser = this.user.id;
      this.comment.auModificationDate = Date.now();
      this.commentService.update(id, this.comment)
      .pipe(finalize( () => this.ngOnInit()))
      .subscribe(
        data => {
          this.toastr.success('Comment updated', 'OK', {
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

  saveComment():void {
    this.deleteOldComments();
    this.comment.comment = this.newComment;
    this.comment.auCreationUser = this.user.id;
    this.comment.auCreationDate = Date.now();
    this.recipeOld.comments.push(this.comment);

    let paramsAux = this.activatedRoute.snapshot.params;
    const id = paramsAux["id"];
    this.recipeOld.auModificationUser = this.user.id;
    this.recipeService.update(id, this.recipeOld)
    .pipe(finalize( () => this.ngOnInit()))
    .subscribe(
      data => {
        
        this.toastr.success('Recipe Comment updated', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
      }
    );



/*
    this.commentService.save(this.comment)
    .pipe(finalize( () =>  this.ngOnInit()))
    .subscribe(
      data => {
        this.toastr.success('Comment created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.ngOnInit();
      }
    );
    */
  }

  deleteOldComments() :void{
    if (this.recipeOld.comments.length !== 0) {
      for (let i = 0; i < this.recipeOld.comments.length; i++) {
        var comment:Comment = this.recipeOld.comments[i];
        this.deleteComment(comment.id, 1);
      }
    } else{
      console.log("There are not comments that delete",this.commentsOld);
    }
  }

  deleteOneComment(id:number) :void{
    console.log("id",id);
    this.deleteComment(id, 2);
  }

  deleteComment(id:number, type:number) : void {
    this.commentService.delete(id).subscribe(
      data => {
        if (type === 2){
          this.toastr.success('Comment deleted', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          window.location.reload();
        }
      },
      err => {
        console.log("ERROR",err.error.mensaje);
        this.ngOnInit();
      }
    );  
  }

  
  deleteOldKeywords() :void{
    if (this.recipeOld.keywords.length !== 0) {
      for (let i = 0; i < this.recipeOld.keywords.length; i++) {
        var keyword:Keyword = this.recipeOld.keywords[i];
        this.deleteKeyword(keyword.id, 1);
      }
    } else{
      console.log("There are not keywords that delete",this.commentsOld);
    }

/*
    for (let i = 0; i < this.keywordsOld.length; i++) {
      
      var keyword:Keyword = this.keywordsOld[i];
      console.log("keyword",keyword);
      this.deleteKeyword(keyword.id, 1);
    }
    */
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

  cleanKeyword() : void {
    this.keywordService.clean().subscribe(
      data => {
        /*
          this.toastr.success('Keyword deleted', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.ngOnInit();
          */
      },
      err => {
        console.log("ERROR",err.error.mensaje);
      }
    );  
  }

/*
  loadKeyword(id:number) : void{
    this.keywordService.detail(id).subscribe(
      data => {
        this.keyword = data;
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

  keywordLoad(id:string[]): void{
    this.recipe.keywords = [];
    id.forEach(rol => {     
      this.keywordService.detail(Number(rol)).subscribe(
        data => {
          this.keyword = data;
          this.recipe.keywords.push(data);      
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );      
    });
    
  }
*/
  commentLoad(id:string[]): void{
    this.recipe.comments = [];
    id.forEach(comment => {     
      this.commentService.detail(Number(comment)).subscribe(
        data => {
          this.comment = data;
          this.recipe.comments.push(data);      
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );      
    });
    
  }

  formatDate (dateNumber: number): string{
    var date = new Date(dateNumber);
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
    return date.toLocaleString('sv-SE', { timeZone: 'UTC' });
  }

}
