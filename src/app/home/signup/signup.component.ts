import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { SignUpService } from './signup.service';
import { lowerCaseValidator } from "src/app/shared/validators/lower-case.validator";
import { UserNotTakenValidadorService } from "./user-not-taken.validator.service";
import { NewUser } from "./new-user";
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidadorService ]
})

export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidadorService: UserNotTakenValidadorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ]
      ],
      userName: ['', // só entra valor padrão do input, valor inicial a ser exibido.
        [ // nesse array só entra validadores síncronos.
          Validators.required,
          //Validators.pattern(/^[a-z0-9_\-]+$/), // começa com letra minuscula e pode ter numero no final apenas.
          lowerCaseValidator, // método validator criado em shared/validator que verifica caracteres no Input do HTML.
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        // aqui entra validadores assíncronos.
        this.userNotTakenValidadorService.checkUserNameTaken() // retorna uma função de validação.
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ]
      ],
    }, {
      validator: userNamePassword // método que verifica se os dois campos tem valores iguais chamado de validador CrossField.
    })

    this.platformDetectorService.isPlatformBrowser() && // detecta se é no browser ou não. "&&" avalia a segunda condição, se for false, nem executa.
      this.emailInput.nativeElement.focus();

  }

  signup() { // pegar os dados do formulário

    if(this.signupForm.valid && this.signupForm.pending){
      const newUser = this.signupForm.getRawValue() as NewUser; // retorna um objeto com todos os dados do formulário, em vez de fazer um por um.
      this.signUpService
        .signup(newUser)
        .subscribe(
          () => this.router.navigate(['']),
          err => console.log(err)
        ) // vai para a página de início após o submit do form.
    }
  }

}
