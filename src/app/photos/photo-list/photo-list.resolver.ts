import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";

@Injectable({
  providedIn: 'root',
})

export class PhotoListResolver implements Resolve<Observable<Photo[]>> { // tipo de retorno da classe <Observable<Photo[]>>

  constructor(private service: PhotoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
    const userName = route.params.userName; // nome do seguimento da rota que é o nome do usuário.

    return this.service.listFromUserPaginated(userName, 1) // resolver vai pegar as primeiras 12 fotos da página.
  }
}
