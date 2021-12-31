import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { Keyword } from '../models/keyword';
import { TokenService } from '../service/token.service';
import { RecipeService } from '../service/recipe.service';
import { CommentService } from '../service/comment.service';
import { VwCommentService } from '../service/vwcomment.service';
import { VwComment } from '../models/vwcomment';
import { Comment } from '../models/comment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css']
})
export class DetailRecipeComponent implements OnInit {

  user: User = new User("", "", "", "", "", []);
  recipe: Recipe = new Recipe(this.user, "", "", [], []);
  recipeOld: Recipe = new Recipe(this.user, "", "", [], []);
  username = '';
  comments: VwComment[];
  itemsKeywords: Keyword[];
  keywordsIsEmpty:boolean = false;
  newComment: string;
  commentsOld: Comment[];
  commentEdit = new Map<number, boolean>();
  comment: Comment = new Comment("", 1, 0);


  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private vwCommentService: VwCommentService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    let paramsAux = this.activatedRoute.snapshot.params;
    this.username = this.tokenService.getUserName();
    const id = paramsAux["id"];
    this.loadRecipe(id);
    this.loadComments(id);
    this.getAuthenticatedUser();
    this.newComment = '';
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
        //this.volver();
      }
    );
  }

  loadRecipe(id:number) : void{
    this.recipeService.detail(id).subscribe(
      data => {
        this.recipe = data;
        this.recipeOld = data;
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

  formatDate (dateNumber: number): string{
    var date = new Date(dateNumber);
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
    return date.toLocaleString('sv-SE', { timeZone: 'UTC' });
  }

  canEdit(id:number, option:boolean) : void{
    let isDeleted = this.commentEdit.delete(id);
    this.commentEdit.set(id, true);
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
  this.comment.comment = this.newComment;
  this.comment.auCreationUser = this.user.id;
  this.comment.auCreationDate = Date.now();
  this.commentsOld = this.recipeOld.comments;
  this.recipeOld.comments.push(this.comment);
  let paramsAux = this.activatedRoute.snapshot.params;
  const id = paramsAux["id"];
  this.recipeOld.auModificationUser = this.user.id;

  this.deleteOldComments();
  
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

}

deleteOldComments() :void{
  for (let i = 0; i < this.commentsOld.length; i++) {
    var comment:Comment = this.commentsOld[i];
    this.deleteComment(comment.id, 1);
  }
}

deleteOneComment(id:number) :void{
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
  
}
