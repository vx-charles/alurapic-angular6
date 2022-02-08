import { Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import { Photo } from "../../photo/photo";

@Directive({
  selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

  @Input() ownedPhoto: Photo; // receber parâmetros do mundo externo

  constructor(
    private element: ElementRef<any>, // elemento na qual a diretiva foi adicionada
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService
      .getUser()
      .subscribe(user => {
        if(!user || user.id !== this.ownedPhoto.userId) { // !user - quando user está deslogado. mostra erro, mas funciona
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
      })
  }
}
