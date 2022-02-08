import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { TokenService } from "../token/token.service";
import * as jwt_decode from 'jwt-decode'

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // BehaviorSubject - armazena a última emissão até que alguém apareça para consumi-la com o subscribe().
  private userSubject = new BehaviorSubject<User>(null) // tem que passar um valor inicial ao criar o objeto.
  private userName: string;

  constructor(private tokenService: TokenService) {

    this.tokenService.hasToken() && // tem token? se sim senão executa o método.
      this.decodeAndNotify()
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable(); // retorna um "Observable" e com isso se pode fazer um subscribe no método.
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User; // "as User" fazendo um casting para tipar a variável user. decodifica o token para pegar as informações do usuário.
    this.userName = user.name; // pega o nome no token decodificado.
    this.userSubject.next(user); // emitir através do userSubject
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null); // emite o valor null, para sumir o valor que está lá no Header aparecer o texto "por favor fazer login".
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
