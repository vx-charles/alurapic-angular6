import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";

const API = 'http://localhost:3000'

@Injectable({
  providedIn: 'root' // Injeta e provê a classe para todos os componentes da aplicação 'root'.
})

export class PhotoService {

  constructor(private http: HttpClient) { } // "private" modificador usado no construtor e o typescript entende que o torna uma propriedade da classe privada usada somente nessa classe.

  listFromUser(userName: string) {
    return this.http.get<Photo[]>(API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString()) // HttpParams() pega os parâmetros da URL.
    return this.http.get<Photo[]>(API + '/' + userName + '/photos', { params }); // segundo parâmetro do get() recebe um objeto
  }

  upload(description: string, allowComments: boolean, file: File) {

    const formData = new FormData(); // FormData() não é específico do Angular, existe nos Browsers.
    formData.append('description', description); // a API backend da aplicação espera receber um dado (description).
    formData.append('allowComments', allowComments ? 'true' : 'false'); // API backend passa uma string e não em boolean.
    formData.append('imageFile', file); // a API do backend espera uma propriedade imageFile

    return this.http.post(API + '/photos/upload', formData);
  }

  findById(photoId: number) {
    return this.http.get<Photo>(API + '/photos/' + photoId);
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post(API + '/photos/' + photoId + '/comments', { commentText });
  }

  removePhoto(photoId: number) {
    return this.http.delete(API + '/photos/' + photoId);
  }
}
