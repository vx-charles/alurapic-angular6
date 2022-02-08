import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if(this.userService.isLogged()) { // se vc está logado...
      this.router.navigate(['user', this.userService.getUserName()]); // joga na página /user/flavio
      return false; // navegação para a rota de "Sign up" ou tela de login não vai ser processada.
    }

    return true; // faz o retorno para a página principal devido ao método da classe canActivate().
  }


}
