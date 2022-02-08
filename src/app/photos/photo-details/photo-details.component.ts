import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
  templateUrl: './photo-details.component.html'
})

export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId; // photoId foi definido como parametrizável lá no app.routing.module.ts
    this.photo$ = this.photoService.findById(this.photoId);
  }

  remove() {
    this.photoService.removePhoto(this.photoId)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
