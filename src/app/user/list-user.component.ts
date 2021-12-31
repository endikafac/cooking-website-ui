import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { RecipeFilter } from '../models/recipe-filter';
import { VwUserService } from '../service/vwuser.service';
import { VwUser } from '../models/vwuser';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[] = [];
  vwUsers: VwUser[] = [];
  vwview: any;
  roles: string[];
  username: string;
  isAdmin = false;
  userWithRecipes: boolean;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private vwUserService: VwUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userLoad();
    this.username = this.tokenService.getUserName();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  
  getVwUsers(): void{
    this.vwUserService.list().subscribe(
      data => {
        this.vwUsers = data;
        console.log("vwUsers",this.vwUsers);
      },
      err => {
        console.log(err);
      }
    );
  }

  getRecipesNumber(userId:number): number {
    var vwUser = this.vwUsers.find(vwUser => vwUser.id == userId);
    if (vwUser) {
      return vwUser.recipesNumber;
    } else {
      return 0;
    }
  }

  canBePhysicallyRemoved(userId:number): boolean {
    var vwUser = this.vwUsers.find(vwUser => vwUser.id == userId);
    if (vwUser) {
      if (vwUser.recipesNumber!==0){
        return false
      }
    }
    return true;
  }


  userLoad(): void {
    this.authService.list().subscribe(
      data => {
        this.users = data;
        this.getVwUsers();

      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id: number) {
    this.authService.delete(id).subscribe(
      data => {
        this.toastr.success('User deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
       this.userLoad();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  disable(id: number, user:User) {
    user.auActive = false;
    this.updateUser(id, user);
  }

  enable(id: number, user:User) {
    user.auActive = true;
    this.updateUser(id, user);
  }

  private updateUser(id: number, user:User) {
    this.authService.update(id, user).subscribe(
      data => {
        this.toastr.success('User updated', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
       this.userLoad();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  

}
