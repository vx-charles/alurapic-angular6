import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { AlertType, Alert } from "./alert";

@Injectable({ providedIn: 'root'})
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();
		keepAfterRouteChange = false; // não quero manter depois da rota

		constructor(router: Router) {
			router.events.subscribe(event => {
				if(event instanceof NavigationStart) { // se event é uma instância de NavigationStart é pq está gerando uma nova navegação.
					if(this.keepAfterRouteChange) { // faz a navegação
						this.keepAfterRouteChange = false; // volta pro padrão
					} else {
						this.clear(); // evita da mensagem alert ser exibido por ser null quando mudar de tela.
					}
				}
			});
		}

		success(message: string, keepAfterRouteChange: boolean = false) {
			this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
		}

		warning(message: string, keepAfterRouteChange: boolean = false) {
			this.alert(AlertType.WARNING, message, keepAfterRouteChange);
		}

		danger(message: string, keepAfterRouteChange: boolean = false) {
			this.alert(AlertType.DANGER, message, keepAfterRouteChange);
		}

		info(message: string, keepAfterRouteChange: boolean = false) {
			this.alert(AlertType.INFO, message, keepAfterRouteChange);
		}		

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) { // emite alerta para os components
			this.keepAfterRouteChange = keepAfterRouteChange
			this.alertSubject.next(new Alert(alertType, message)); // emite um novo alerta usando next()
    }

		getAlert() { // fica escutando novos alertas
			return this.alertSubject.asObservable();
		}

		clear() {
			this.alertSubject.next(null); // emite null no Observable e nada vai ser exibido.
		}
}