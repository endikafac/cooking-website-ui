import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RoleService } from '../service/role.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  newUser: User = new User("", "", "", "", "", []);
  roles: Role[];
  role:Role;
  selectedRoles: string[];

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.rolesLoad();
  }

  onCreate(): void {
    this.newUser.password='##'
    console.log("this.newUser",this.newUser);
    this.authService.adminCreate(this.newUser).subscribe(
      data => {
        this.toastr.success('User Created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/user-list']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

  rolesLoad(): void {
    this.roleService.list().subscribe(
      data => {
        this.roles = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  roleLoad(id:string[]): void{
    this.newUser.roles = [];
    id.forEach(rol => {     
      this.roleService.detail(Number(rol)).subscribe(
        data => {
          this.role = data;
          this.newUser.roles.push(data);      
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );      
    });
    
  }


}
