import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/role';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-first-login-user',
  templateUrl: './first-login-user.component.html',
  styleUrls: ['./first-login-user.component.css']
})
export class FirstLoginUserComponent implements OnInit {

  user: User = new User("", "", "", "", "", []);
  newPassword: string;
  newPasswordConfirmation: string;
  role: Role = new Role("");
  rolesAux : Role[] = [];
  username = '';
  isFirstLogin: boolean = false;
  
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    let paramsAux = this.activatedRoute.snapshot.params;
    this.username = this.tokenService.getUserName();
    this.loadUser();
  }

  onUpdate(): void {
    //let paramsAux = this.activatedRoute.snapshot.params;
    const id = this.user.id;
    console.log("this.newPassword",this.newPassword);
    if (this.newPassword && !this.user.auActive){
      console.log("ENTRA");
      this.user.password = this.newPassword;
      this.user.auActive = true;
    } else {
      console.log("NO ENTRA");
      this.user.password = '';
    }
    console.log("this.user.password",this.user.password);
    this.user.lastConnection = this.formatDate();
    this.authService.update(id, this.user).subscribe(
      data => {
        this.toastr.success('User updated', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje + err.message + err.error + err.path, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

  passwordValidation(): void {
    console.log("this.newPassword",this.newPassword);
    console.log("this.newPasswordConfirmation",this.newPasswordConfirmation);
    if (this.newPassword && this.newPasswordConfirmation) {
      if (this.newPassword.length !== 0 && this.newPasswordConfirmation.length !== 0){
        if (this.newPassword !== this.newPasswordConfirmation){
          this.toastr.error('The fields for the new password and the new password confirmation must be identical.', 'Fail', {
            timeOut: 5000,  positionClass: 'toast-top-center',
          });
        }
      }
    }
    
  }

  formatDate (): string{
    var date: Date = new Date();
    console.log("Date = " + date.toISOString());
    return date.getUTCMilliseconds().toString();
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
    //console.log("fecha-lastConnection: ",date.toLocaleString('sv-SE', { timeZone: 'UTC' }));
    //return date.toLocaleString('sv-SE', { timeZone: 'UTC' });
  }


  loadUser(): void {
    console.log(this.username)
    this.authService.detailUsername(this.username).subscribe(
      data => {
        this.user = data;
        if (this.user.lastConnection !== null) {
          this.isFirstLogin = true;
          
        }
        console.log("this.user.firstname",this.user.firstname);
        console.log("this.user.lastname",this.user.lastname);
        console.log("this.user.auActive",this.user.auActive);

      },
      err => {
        console.log("err.error.mensaje-->",err.error.mensaje);
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );

    
    
  }
}
