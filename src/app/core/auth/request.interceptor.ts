import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../token/token.service";

@Injectable()

export class RequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService){ }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      req = req.clone({ // clona a requisição e modifica a requisição adicionando o x-access no Header
        setHeaders: { // .clone({}) recebe um objeto js que tem propriedade setHeaders.
          'x-access-token': token // add token no header
        }
      });
    }
    return next.handle(req); // qualquer requisição que for feita para o backend, será interceptado e o req recebe a requisição alterada do Header com token.
  }

}
