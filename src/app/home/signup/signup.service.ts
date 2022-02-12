import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NewUser } from "./new-user";
import { environment } from "src/environments/environment";

const API = environment.apiUrl;

@Injectable()

export class SignUpService {
  constructor(private http: HttpClient) { }

  checkUserNameTaken(userName: string) {
    return this.http.get(API + '/user/exists/' + userName);
  }

  signup(newUser: NewUser) { // faz o post dos dados do formulário de registro.
    return this.http.post(API + '/user/signup', newUser);
  }
}
