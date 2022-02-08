import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit, OnDestroy {

  @Output() onTyping = new EventEmitter<string>(); // Recebe o valor do evento no componente filho
  @Input() searchValue: string = ''; // usado no value do input HTML.
  debounce: Subject<string> = new Subject<string>(); // o Subject vc pode emite o valor e escutar esse valor e se inscrever com o subscribe().

  ngOnInit(): void {
    //this.debounce.next('f'); // passar ou emitir um valor no método next()
    this.debounce
      .pipe(debounceTime(300)) // pipe executa uma função de 3s do debounceTime.
      .subscribe(filter => this.onTyping.emit(filter)); // ao se inscrever pega o valor obtido, aqui ele está sempre na escuta de algum valor. Usa o emit() para disparar o evento na tela.
  }

  ngOnDestroy(): void { // Chama toda vez quando um objeto é destruído no componente.
    this.debounce.unsubscribe(); // para limpar a memória do observable do Subject(), evitando gastos desnecessários da memória, um problema famoso e conhecido por memory leak!
  }

}
