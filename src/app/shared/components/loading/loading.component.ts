import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { LoadingService } from "./loading.service";
import { LoadingType } from "./loading-type";

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loading$ = this.loadingService
      .getLoading() // vai ficar na escuta com valor inicial de LoadingType.STOPPED
      .pipe(map(loadingType => loadingType.valueOf())) // retorna o valor da string da enum
  }
}
