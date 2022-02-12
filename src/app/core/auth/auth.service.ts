import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from "src/environments/environment";

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName: string, password: string) { // devolve um Observable, logo tem q ter "return"
    return this.http
      .post(
        API + '/user/login',
        { userName, password },
        { observe: 'response' } // para ter acesso ao cabeçalho e a tudo que tem na resposta.
      )
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token'); // nome do cabeçalho na header do backend
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`) // RESULT: User flavio authenticated with token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYzODUzNTMxMSwiZXhwIjoxNjM4NjIxNzExfQ.1XY4JdyhKwHBpt-xpyGQKuoxeY04yixO4kWswhmLZJ4
      })) // quem fizer o subscribe, essa operação no "pipe()" serão aplicadas antes para o subscribe.
  }
}
