import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { PageGlobalErrorComponent } from './page-global-error/page-global-error.component';

@NgModule({
  declarations: [NotFoundComponent, PageGlobalErrorComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [{
    provide: ErrorHandler, // Prover o ErrorHandler do angular.
    useClass: GlobalErrorHandler // Em vez do ErrorHandler do angular, vai usar da class GlobalErrorHandler que criamos, um custom ErrorHandler.
  }]
})
export class ErrorsModule { }
