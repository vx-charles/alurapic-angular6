import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/auth/auth.guard";
import { NotFoundComponent } from "./errors/not-found/not-found.component";

import { PhotoFormComponent } from "./photos/photo-form/photo-form.component";
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoDetailsComponent } from "./photos/photo-details/photo-details.component";
import { PhotoListResolver } from "./photos/photo-list/photo-list.resolver";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', // full - a rota tem q ser exatamente aquela, somente a "/" para fazer redirect na página home.
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule' // nome_do_arquivo#nome_do_modulo_classe - carrega o module com todas as rotas.
  },
  {
    path: 'user/:userName',
    component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver // componente vai ter acesso a propriedade "photos" com o resultado "PhotoListResolver"
    },
    data: { // dados extras que pode ser usado na rota, nesse caso vamos usar o title para as usar nas páginas.
      title: "Timeline"
    }
  },
  {
    path: 'p/add',
    component: PhotoFormComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Photo upload"
    }
  },
  {
    path: 'p/:photoId', // :photoId valor curinga, aceita qualquer valor na URL e exibe a página. Essa rota está parametrizada.
    component: PhotoDetailsComponent,
    data: {
      title: "Photo detail"
    }
  },
  { 
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: "Not found"
    }
  },
  { path: '**', redirectTo: 'not-found' } // path: '**' - qualquer página inexistente carrega a página de fotos.
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }) // ativa a URL com hash, conhecido como "HTML5 mode", usa a API do navegador por baixo. Ex: localhost:4200/#/signup
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
