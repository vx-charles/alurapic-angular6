import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first } from "rxjs/operators";

import { SignUpService } from "./signup.service";

@Injectable() // providers: [ UserNotTakenValidadorService ] está sendo usado na class SignUpComponent usando providers em vez de provideIn: 'root'.

export class UserNotTakenValidadorService {

  constructor(private signUpService: SignUpService) { }

  checkUserNameTaken() { // validador assíncrono retorna um Observable
    return (control: AbstractControl) => {

      return control
        .valueChanges // "control.valueChanges" é um Observable que vai fazer o subscrible() e depois extrair o valor.
        .pipe(debounceTime(300)) // Faz a verificação no backend a cada 300ms durante o "control.valueChanges".
        .pipe(switchMap(userName => { // captura o texto digitado com o switchMap e passa no parâmetro userName, depois o switchMap() pára com a emissão do debounceTime() e começa a trabalhar com checkUserNameTaken(userName)
          return this.signUpService.checkUserNameTaken(userName)
        }))
        .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null )) // pipe() executa o map() do resultado para retornar um objeto JS ou null.
        .pipe(first()) // first() - pega o primeiro valor digitado no input, pode ser mais de 1 caracter e completa a emissão do subscrible() após digitado.
    }
  }
}
