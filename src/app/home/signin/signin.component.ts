import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetectorService } from "src/app/core/platform/platform-detector.service";

@Component({
  templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required ], // os mesmos nomes add no template HTML do input "formControlName"
      password: ['', Validators.required ],
    })
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .authenticate(userName, password)
      .subscribe(
        () => this.router.navigate(['user', userName]), // .navigate(['user', userName]) - busca na URL "/user/flavio" sem se importar se a navegação da url for extensa.
        err => {
          console.log(err);
          this.loginForm.reset(); // limpar form
          this.platformDetectorService.isPlatformBrowser() && // detecta se é no browser ou não. "&&" avalia a segunda condição, se for false, nem executa.
            this.userNameInput.nativeElement.focus(); // faz o focus() no input userName
          alert('Invalid user name or password')
        }
      )
  }

}
