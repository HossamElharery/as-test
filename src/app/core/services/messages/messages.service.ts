import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
// import { CustomSnackbarComponent } from '../../../shared/components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) { }

  // showSuccessMessage(message: string, duration: number = 5000) {
  //   if (message) {
  //     this.snackBar.openFromComponent(CustomSnackbarComponent, {
  //       horizontalPosition: 'end',
  //       verticalPosition: 'bottom',
  //       duration: duration,
  //       data: {
  //         message: this.translate.instant(message),
  //         type: 'success'
  //       }
  //     });
  //   }
  // }

  // showErrorMessage(error: any, message: string, duration: number = 5000) {
  //   let err_msg: string = '';
  //   if (message) {
  //     err_msg = message;
  //   } else if (error.status == 400) {
  //     err_msg = error.error.message;
  //   } else if (error.status == 422) {
  //     Object.keys(error.error.errors).forEach(key => {
  //       err_msg = error.error.errors[key][0];
  //     })
  //   }

  //   if (err_msg) {
  //     this.snackBar.openFromComponent(CustomSnackbarComponent, {
  //       horizontalPosition: 'end',
  //       verticalPosition: 'bottom',
  //       duration: duration,
  //       data: {
  //         message: this.translate.instant(err_msg),
  //         type: 'error'
  //       }
  //     });
  //   }
  // }

  // showLoginError(error: any, duration: number = 5000) {
  //   if (error) {
  //     this.snackBar.openFromComponent(CustomSnackbarComponent, {
  //       horizontalPosition: 'end',
  //       verticalPosition: 'bottom',
  //       duration: duration,
  //       data: {
  //         message: this.translate.instant(error),
  //         type: 'error'
  //       }
  //     });
  //   }
  // }


}
