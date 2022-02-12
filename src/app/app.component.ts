import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router, // dá o evento disparado na rota
    private activatedRoute: ActivatedRoute, // qual é a rota ativada no momento.
    private titleService: Title // serviço do próprio angular para add titulo nas páginas.
  ) {}

  ngOnInit(): void {
    this.router.events // fica escutando uma navegação de rota quando chega ao fim.
    .pipe(filter(event => event instanceof NavigationEnd)) // se o filter der true, ele vai executar o pipe() seguinte.
    .pipe(map(() => this.activatedRoute)) // this.activatedRoute vai ser tratado no próximo pipe().
    .pipe(map(route => { // sobe na hierarquia de rotas para pegar a rota ativada no momento.
      while(route.firstChild) route = route.firstChild; // essa rota é a primeira filha se sim, retorna essa route.
      return route;
    }))
    .pipe(switchMap(route => route.data)) // retorna um observable usando switchMap() onde ele vai parar de ouvir o this.router.events, já que conseguiu os dados que queria da rota.
    .subscribe(event => this.titleService.setTitle(event.title)); // event recebe os dados do pipe() anterior e no parâmetro do event contém os dados do title.
  }
}
