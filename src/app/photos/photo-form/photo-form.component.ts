import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File; // Arquivo do tipo File".
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true] // inicializa como true sem nenhum valor, já marcado.
    })
  }

  upload() {
    //const dados = this.photoForm.getRawValue(); // traz objeto em JS, as propriedades file, description, allowComents.
    //console.log(dados); // result: {file: 'C:\\fakepath\\WhatsApp Image 2022-01-20 at 18.01.33 (1).jpeg', description: 'teste', allowComments: true}

    const description = this.photoForm.get('description').value; // pega o valor digitado.
    const allowComments = this.photoForm.get('allowComments').value; // pegar valor true, checkbox marcado.
    // console.log(this.file); // Vem do "event bind" disparado da mudança que antes não tinha arquivo e "$event.target.files[0]" que dispara do <input> do tipo "file" que é um array com todos os arquivos do usuário, mesmo sendo 1. Acessa o binário.

    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => { // rxjs operator que quando tudo for finalizado, executa essa callback, mesmo dando certo ou errado.
        this.router.navigate(['/user', this.userService.getUserName()]); // volta pra tela de imagens do usuário com a mensagem alerta de sucesso.
      }))
      .subscribe(
        (event: HttpEvent<any>) => {
          if(event.type === HttpEventType.UploadProgress) { // se event.type é upload ou download, no caso vai ser upload.
            this.percentDone = Math.round(100 * event.loaded / event.total); // conta matemática que calcula o percentual.
          } else if(event instanceof HttpResponse) { // quando o evento for HttpResponse significa que terminou o upload.
            this.alertService.success('Upload complete', true);            
          }
        },
        err => {
          console.log(err);
          this.alertService.danger('Upload error!', true);
        }
      );
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader(); // variável vai acessar as propriedades do objeto, é JS puro.
    reader.onload = (event: any) => this.preview = event.target.result; // reader.onload - quando o reader terminar o trabalho assíncrono, vai armazenar o resultado na variável.
    reader.readAsDataURL(file); // converte em base64 e é uma operação assíncrona.
  }
}
