import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as Stacktrace from 'stacktrace-js'
import { LocationStrategy } from "@angular/common";
import { UserService } from "../../core/user/user.service";
import { ServerLogService } from "./server-log.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable() // não precisa usar o provideIn: {"root"}, pois ele já provido pelo ErrorModule.
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: any): void {
      console.error('Passou pelo GlobalErrorHandler');

      const location = this.injector.get(LocationStrategy); // Injeta sob demanda, ou seja, caso handleError() seja processado, será capurado por aqui, em vez de fazer direto no constructor() para não gerar erro de "undefined" a um componente que usa o serviço também instaciado no constructor().
      const url = location instanceof LocationStrategy ? location.path() : ''; // pega a rota atual da URL.
      const userService = this.injector.get(UserService);
      const serverLogService = this.injector.get(ServerLogService);
      const router = this.injector.get(Router);

      const message = error.message ? error.message : error.toString(); // faz uma condição ternária, pois tem momento que o erro não é uma instância de erro.

      if(environment.production) // é interessante deixa isso em produção apenas o erro ser direcionado para a página.
        router.navigate(['/error']); // vai para a página de error.

      Stacktrace
        .fromError(error) // o resultado de erros fica em um array.
        .then(stackframes => {
          // console.log(stackframes); // Ex: [0: StackFrame { columnNumber: 0, fileName: "webpack:///node_modules/zone.js/dist/zone.js", functionName: "scheduleResolveOrReject", lineNumber: 831 }]
          const stackAsString = stackframes.map(sf => sf.toString()).join('\n');

          console.log(stackAsString);
          console.log(message);
          console.log('o que será enviado para o servidor');
          serverLogService.log({ message, url, userName: userService.getUserName(), stack: stackAsString }) // aqui está fazendo o post() com os parâmetros para o servidor.
            .subscribe(
              () => console.log('Error logged on server')),
              err => { // caso o servidor fique fora do ar.
                console.log('Fail to send error log on server');
                console.log(err);
              }
        });
    }
}
