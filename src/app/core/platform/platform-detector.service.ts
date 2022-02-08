import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root' // não precisa pertencer a um module, já fica disponível pra toda a aplicação.
})

export class PlatformDetectorService {

  constructor(@Inject(PLATFORM_ID) private platformId: string) { } // especifica o tipo de string ao @Inject(PLATFORM_ID) com o identificador de token.

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId); // identifica se na plataforma está rodando no navegador ou em uma SSR.
  }
}
