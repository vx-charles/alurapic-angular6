import { HttpResponse, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpInterceptor } from "@angular/common/http";
import { LoadingService } from "./loading.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpSentEvent |
      HttpHeaderResponse |
      HttpProgressEvent |
      HttpResponse<any> |
      HttpUserEvent<any>> {
        return next // é um render que lida com a requisição
          .handle(req) // recebe a requuisição, mas não faz nada. Retorna um observable e pode encadear um pipe().
          .pipe(tap(event => { // tap() - assim que os dados chegam, faz o subscribe.
              if(event instanceof HttpResponse) { // Se for uma resposta ou chega uma resposta, fecha o loading.
                  this.loadingService.stop();
              } else {
                  this.loadingService.start();
              }
          }))
    }
}
