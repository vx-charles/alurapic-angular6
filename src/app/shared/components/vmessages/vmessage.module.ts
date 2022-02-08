import { NgModule } from "@angular/core";
import { VMessageComponent } from "./vmessage.component";

@NgModule({
  declarations: [
    VMessageComponent,
  ],
  exports: [
    VMessageComponent // exporta pra ver quem vai usar esse componente
  ]
})

export class VMessageModule {

}
