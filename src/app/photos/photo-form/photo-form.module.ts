import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { PhotoFormComponent } from './photo-form.component';
import { VMessageModule } from "src/app/shared/components/vmessages/vmessage.module";
import { PhotoModule } from "../photo/photo.module";
import { ImmediateClickModule } from "src/app/shared/directives/immediate-click/immadiate-click.module";

@NgModule({
  declarations: [
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VMessageModule,
    RouterModule,
    PhotoModule,
    ImmediateClickModule
  ]
})

export class PhotoFormModule {

}
