import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NewUser } from "./new-user";

const API_URL = "http://localhost:3000"

@Injectable()

export class SignUpService {
  constructor(private http: HttpClient) { }

  checkUserNameTaken(userName: string) {
    return this.http.get(API_URL + '/user/exists/' + userName);
  }

  signup(newUser: NewUser) { // faz o post dos dados do formulário de registro.
    return this.http.post(API_URL + '/user/signup', newUser);
  }
}
