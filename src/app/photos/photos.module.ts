import { NgModule } from '@angular/core';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
  declarations: [
    // usado apenas para os componentes deste módulo.
  ],
  //exports: [ PhotoComponent ], // exporta o componente para o module se tornar acessível ao App.
  imports: [
    PhotoModule,
    PhotoFormModule,
    PhotoListModule,
    PhotoDetailsModule
  ]
})

export class PhotosModule {

}
