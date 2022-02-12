import { Component, Input } from "@angular/core";
import { Alert, AlertType } from "./alert";
import { AlertService } from "./alert.service";

@Component({
  selector: 'ap-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  @Input() timeout = 3000;
  alerts: Alert[] = []; // Vai guardar os alertas que foram disparados pelos serviços.

  constructor(private alertService: AlertService) {
    this.alertService
      .getAlert()
      .subscribe(alert => {
        if(!alert) { // se alert é null
          this.alerts = []; // apagar o alerts
          return;
        }
        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), this.timeout);
      });
    }

    removeAlert(alertToRemove: Alert) {
      // this.alerts - cria um novo array no qual não tenha o alert que eu quero remover.
      this.alerts = this.alerts.filter(alert => alert !== alertToRemove);
    }

    getAlertClass(alert: Alert) {
      if(!alert) return '';

      switch(alert.alertType) {
        case AlertType.DANGER:
          return 'alert alert-danger';
        case AlertType.INFO:
          return 'alert alert-info';
        case AlertType.SUCCESS:
          return 'alert alert-success';
        case AlertType.WARNING:
          return 'alert alert-warning';
      }
    }
}