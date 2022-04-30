import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './photo-details.component.html'
})

export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId; // photoId foi definido como parametrizável lá no app.routing.module.ts
    this.photo$ = this.photoService.findById(this.photoId); // this.photo$ armazena um Observable
    this.photo$.subscribe(
      _ => {}, // callback de sucesso sem fazer nada.
      err => {
        console.log(err);
        this.router.navigate(['not-found']);
      }
    );
  }

  remove() {
    this.photoService.removePhoto(this.photoId)
      .subscribe(
        () => {
          this.alertService.success('Foto removed', true)
          this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true }); // volta pra tela de imagens do usuário com a mensagem alerta de sucesso e o "relaceUrl: true" remove a rota do history da página da foto excluída.
        },
        err => {
          console.log(err);
          this.alertService.warning('Could not deleted the photo!', true);
        });
  }

  like(photo: Photo) {
    this.photoService
      .like(photo.id)
      .subscribe(liked => { // retorna um observable true ou false.
        if(liked) {
          this.photo$ = this.photoService.findById(photo.id); // busca a foto no backend para trazer o valor do like que foi feito e qualquer outra curtida ou like.
        }
      });
  }
}
