import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  user: User = new User("", "", "", "", "", []);
  newPassword: string;
  newPasswordConfirmation: string;
  role: Recipe = new Recipe(this.user,"","",[]);

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let paramsAux = this.activatedRoute.snapshot.params;
    
    const id = paramsAux["id"];
    console.log("id-->",id);
    this.authService.detail(id).subscribe(
      data => {
        console.log("data-->",data);
        this.user = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    let paramsAux = this.activatedRoute.snapshot.params;
    const id = paramsAux["id"];
    this.user.password = this.newPassword;
    /*
    var index = 0;
    console.log('this.newUser.roles',this.newUser.roles);
    for(let roleAux of this.newUser.roles){
      console.log('roroleAuxlesAux',roleAux);
      this.role = new Role(roleAux.roleName);
      console.log('role',this.role);
      //this.rolesAux[index] = this.role;
      this.rolesAux.push(this.role);
      
    } 
    console.log('rolesAux',this.rolesAux);
    this.newUser.roles = this.rolesAux;
    */
    this.authService.update(id, this.user).subscribe(
      data => {
        this.toastr.success('User updated', 'OK', {
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

  passwordValidation(): void {
    if (this.newPassword.length != 0 && this.newPasswordConfirmation.length != 0){
      if (this.newPassword != this.newPasswordConfirmation){
        this.toastr.error('The fields for the new password and the new password confirmation must be identical.', 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    }
    
  }

}
