import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";

@Directive({
  selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  currentDisplay: string;


  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display; // pega o estilo atual do display e guardar na string.
    this.userService.getUser().subscribe(user => { // aqui usou um observable para mudar um estado do componente a partir de uma outra ação de um outro componente nada ver que seria o menu.
      if(user) { // se está logado, o componente dispara o evento e torna o menu visível.
        this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
      } else { //se não tá logado
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      }
    });
  }
}
