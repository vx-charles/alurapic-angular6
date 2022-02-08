import { Pipe, PipeTransform } from "@angular/core";
import { Photo } from './../photo/photo';

@Pipe({
  name: 'filterByDescription'
})

export class FilterByDescription implements PipeTransform{

  /*
    transform(params 1, params 2)
    params 1: quem vc vai aplicar a transformação, que vai sar a lista de fotos.
    params 2: damos o nome de descriptionQuery que recebe o valor do input digitado.
  */

  transform(photos: Photo[], descriptionQuery: string) {
    descriptionQuery = descriptionQuery.trim().toLowerCase();

    if(descriptionQuery) {
      return photos.filter(photo =>
        photo.description.toLowerCase().includes(descriptionQuery) // verifica se a palavra digitada faz parte ou existe.
      )
    } else {
      return photos // retorna sem estar filtrado.
    }
  }

}
