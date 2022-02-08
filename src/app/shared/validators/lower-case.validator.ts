import { AbstractControl } from "@angular/forms";

// todo "validador" recebe como parâmetro um "AbstractControl", pois "control" é sinônimo de Input, quando se usa input no HTML.
export function lowerCaseValidator(control: AbstractControl) {

  // se o valor do Input não tiver valor vazio e não segue a expressão regular "!/^[a-z0-9_\-]+$/"
  if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
    return { // retorna em um objeto que será usado no HTML.
      lowerCase: true
    }
  }

  return null; // se não houver erros de validação.
}
