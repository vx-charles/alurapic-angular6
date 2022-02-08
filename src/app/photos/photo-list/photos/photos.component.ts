import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [] // recebe as fotos do componente photo-list por "data bind".
  rows: any[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges) { // recebe um parâmetro das mudanças das inbounds properties do @Input() do componente.

    if(changes.photos) // se ouve mudança na inbound
      this.rows = this.groupColumns(this.photos);

  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    for(let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3))
    }

    /* Cria uma matriz pra cada 3 fotos nas rows
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7],
      ]

      OBS: slice não inclui a ultima posição, se o index final é 3,
      o valor do index será o seu anterior.
    */

   return newRows;
  }

}
