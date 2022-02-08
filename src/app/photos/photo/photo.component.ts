import { Component, Input } from "@angular/core";

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
  selector: 'ap-photo',
  templateUrl: './photo.component.html',
  // styleUrls: ''
})

export class PhotoComponent {

  private _url = '';

  @Input() description = ''; // @Input() - Inbound property permite passar os dados ao componente.

  @Input() set url(url: string) { // parâmetro "url" vem do inbound @Input() de um component que recebe o valor.
    if(!url.startsWith('data')){ // se a url da imagem começa com src="data:image/jpeg;base64,/84as89d4f..."
      this._url = CLOUD + url;
    } else {
      this._url = url; // armazena na variavel esse valor recebido usando o set()
    }
  }

  get url() { // se algum lugar acessar a variável _url, vai executar o get url().
    return this._url;
  } // O get url() é acessado desse jeito fora do component: PhotoComponent.url que retorna o valor do inbout @Input()
}
