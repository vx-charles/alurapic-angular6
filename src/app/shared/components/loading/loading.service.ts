import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";

import { LoadingType } from "./loading-type";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new Subject<LoadingType>();

  getLoading() {
    return this.loadingSubject
      .asObservable() // faz o suject como observable, fica na escuta.
      .pipe(startWith(LoadingType.STOPPED)) // pega um observable e faz a primeira emissão dele do valor de loading como stopped, seria como valor inicial.
  }

  start() {
    return this.loadingSubject.next(LoadingType.LOADING);
  }

  stop() {
    return this.loadingSubject.next(LoadingType.STOPPED);
  }
}