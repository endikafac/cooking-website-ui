import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

  
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  isFirstLogin: boolean = false;
  username = '';
  user: User = new User("", "", "", "", "", []);

  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.username = this.tokenService.getUserName();
      this.loadUser();
    } else {
      this.isLogged = false;
      this.username = '';
    }

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
  

}
