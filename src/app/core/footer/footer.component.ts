import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {

  user$: Observable<User> // quando se tem um valor de Observable, se usa "$". recebe o resultado do tipo Observable.
  // user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = this.userService.getUser();
    // this.user$.subscribe(user => this.user = user); // recebe o resultado do subscribe onde tem os dados do usuário.
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']); // volta pra tela principal.
  }
}
