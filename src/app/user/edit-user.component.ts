import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/role';
import { RoleService } from '../service/role.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User("", "", "", "", "", []);
  newPassword: string;
  newPasswordConfirmation: string;
  role: Role = new Role("");
  roles: Role[];
  rolesAux : Role[] = [];
  selectedRoles: string[];
  spinner: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let paramsAux = this.activatedRoute.snapshot.params;
    
    const id = paramsAux["id"];
    this.authService.detail(id).subscribe(
      data => {
        this.user = data;
        this.rolesLoad();
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
    
    this.authService.update(id, this.user)
    .pipe(finalize( () => this.volver()))
    .subscribe(
      data => {
        this.toastr.success('User updated', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
      },
      err => {
        this.toastr.error(err.error.mensaje + err.message + err.error + err.path, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
    
  }

  volver(){
    this.router.navigate(['/user/list']);
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

  roleLoad(id:string[]): void{
    this.user.roles = [];
    id.forEach(rol => {     
      this.roleService.detail(Number(rol)).subscribe(
        data => {
          this.role = data;
          this.user.roles.push(data);      
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );      
    });
    
  }

  rolesLoad(): void {
    this.roleService.list().subscribe(
      data => {
        this.roles = data;
        this.selectedRoles = [];
        this.user.roles.forEach(rol => {    
          this.selectedRoles.push(rol.id.toString());     
        });
      },
      err => {
        console.log(err);
      }
    );
    
  }

}
