import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RequestInterceptor } from "./auth/request.interceptor";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor, // classe para usar o interceptor, que toda vez o HTTP_INTERCEPTORS for solicitado.
      multi: true // se tiver mais um interceptor na jogada e delegue para o próximo.
    }
  ]
})

export class CoreModule {

}
