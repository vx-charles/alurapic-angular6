import { Injectable } from "@angular/core";

const KEY = 'authToken'

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  hasToken() {
    return !!this.getToken() // returna um boolean por causa do "!!", pois se o token for "" será null e com "!!" ele se torna false.
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
