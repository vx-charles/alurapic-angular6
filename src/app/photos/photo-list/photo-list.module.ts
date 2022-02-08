import { SearchComponent } from './search/search.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { FilterByDescription } from "./filter-by-description.pipe";
import { PhotoModule } from "../photo/photo.module";
import { CardModule } from "src/app/shared/components/card/card.module";
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darkn-on-hover.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    FilterByDescription,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PhotoModule, // importa o module que tem o componente externo do template <ap-photo>
    CardModule,
    DarkenOnHoverModule,
    RouterModule
  ]
})

export class PhotoListModule {

}
