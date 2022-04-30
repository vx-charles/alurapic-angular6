import { ValidatorFn, FormGroup } from "@angular/forms";

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => { // ValidatorFn é um tipo de função que valida a partir do FormGroup.
  const userName = formGroup.get('userName').value;
  const password = formGroup.get('password').value;

  if (userName.trim() + password.trim()) { // se tem alguma coisa digitada é "true" e se tiver vazio é "false".
    // verifica se os dois campos são iguais, se for, retorn um objeto true.
    return userName !== password ? null : { userNamePassword: true };
  } else {
    return null; // faz nenhuma validação
  }
}
