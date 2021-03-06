import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if(!this.userService.isLogged()) { // se vc não está logado...
      this.router.navigate(
        [''], // joga na página de login
        {
          queryParams: {
            // O objeto chave "fromUrl", pode ser qualquer nome.
            fromUrl: state.url // usou o RouterStateSnapshot para pegar a url que o usuário tentou acessar, e será adicionado na URL com esses parâmetros ao tentar entrar na página sem fazer o login.
          }
        }
      );
      return false; // navegação para a rota de "Sign up" ou tela de login não vai ser processada.
    }
    return true; // faz o retorno para a página principal devido ao método da classe canActivate().
  }
}
