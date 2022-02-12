export class Alert {

  constructor(
    public readonly alertType: AlertType,
    public readonly message: string
  ) {}
}

export enum AlertType {
  SUCCESS, // SUCCESS = 0
  WARNING, // WARNING = 1
  DANGER, // DANGER = 2
  INFO // INFO = 3
}    