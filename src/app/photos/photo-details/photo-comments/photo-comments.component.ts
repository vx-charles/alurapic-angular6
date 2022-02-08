import { Component, Input, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.scss']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  commentForm: FormGroup;

  comments$: Observable<PhotoComment[]>;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.photoService
      .addComment(this.photoId, comment)
      // O operador switchMap cancela o Observable anterior passando o fluxo para um novo Observable, garantindo assim que a emissão tenha apenas o valor emitido pelo Observable retornado por switchMap.
      .pipe(switchMap( () => this.photoService.getComments(this.photoId)) ) // switchMap() vai executar uma operação de outro Observable.
      .pipe(tap(() => { // tap() vai tipo fazer um "negocinho" ou "toquinho", então antes de retornar o Observable feito no switchMap(), ele vai executar o tap() e depois armazenar os dados atualizados no this.comments$, seria um side effects.
        this.commentForm.reset();
      }))
  }
}
