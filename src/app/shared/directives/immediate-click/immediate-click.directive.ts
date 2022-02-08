import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatformDetectorService } from "src/app/core/platform/platform-detector.service";

@Directive({
  selector: '[immediateClick]'
})

export class ImmediateClickDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private platformDetector: PlatformDetectorService
  ) { }

  ngOnInit(): void { // depois que receber a injeção de dependências do constructor, aí sim o ngOnInit() vai ser executado.
    this.platformDetector.isPlatformBrowser &&
    this.element.nativeElement.click(); // ao add diretiva no HTML, ele executará o click automaticamente.
  }
}
