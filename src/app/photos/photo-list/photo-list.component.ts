import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})

export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe() como é um Observable q fica na escuta, toda vez q a rota mudar na página (quando usa o botão avançar e voltar da página), ele vai pegar o parâmetro da rota e vai executar pra pegar os dados da rota.
    this.activatedRoute.params.subscribe(params => { // retorna um array de objeto com os parâmetros que foram passados no formulário.
      this.userName = params.userName;
      // this.photos = this.activatedRoute.snapshot.data['photos']; tem o mesmo efeito acima.
      this.photos = this.activatedRoute.snapshot.data.photos; // pega os dados do resolver da rota da propriedade photos lá criada no arquivo app.routing.module.ts já prontos.
    });
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage) // ++this.currentPage pré-incremento para carregar a segunda página.
      .subscribe(photos => {
        this.filter = ''; // limpa o filtro e carrega todas as imagens
        this.photos = this.photos.concat(photos); // change detection do Angular vai funcionar com concat() e renderizar as fotos restantes.
        if(!photos.length) this.hasMore = false // oculta o botão.
      })
    }

}
