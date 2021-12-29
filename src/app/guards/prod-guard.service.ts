import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {


  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let dataAux = route.data;
    const expectedRol = dataAux["expectedRol"];
    const roles = this.tokenService.getAuthorities();
    console.log('roles',roles);
    console.log('expectedRol',expectedRol);
    var authorizedByRole: boolean = false;
    roles.forEach(role => {
      for (let userRole of expectedRol){
          if (role === userRole){
            authorizedByRole = true;
          }
      }    
        
      
    });


    if (!this.tokenService.getToken() || !authorizedByRole) {
      this.router.navigate(['/index']);
      
      this.toastr.error("Not autorized", 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      return false;
    }
    return true;
  }
}
