import { ValidatorFn, AbstractControl } from '@angular/forms';

export function duplicateNameValidator(names: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden;
    if (control.value && names) {
      forbidden = names.includes(control.value.toLowerCase());
    }
    return forbidden ? { duplicate: { value: control.value } } : null;
  };
}

export function formulaValidator(control: AbstractControl) {
  // const precedence = [];
  if (!control.value) {
    return null;
  }
  const str = control.value;
  let formulaError = false;
  const arr = [];
  for (let i = 0; i <= str.length; i++) {
    if (str[i] === '(' || str[i] === ')') {
      arr.push(str[i]);
    } else if (str[i] === '[') {
      let variable = '';
      i++;
      do {
        variable = variable + str[i];
        i++;
      } while (str[i] !== ']' && str[i] !== undefined);
      console.log(str[i], i);
      if (str[i] === ']') {
        arr.push(2);
      } else {
        arr.push('#');
      }
    } else if (/\d/.test(str[i])) {
      let variable = '';
      while (!isNaN(str[i]) || str[i] === '.') {
        variable = variable + str[i];
        i++;
      }
      i--;
      arr.push(parseFloat(variable));
      if (i >= str.length) {
        break;
      }
    } else if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
      arr.push(str[i]);
    } else if (str[i] === ' ' || str[i] === ']') {
    }
  }
  // let values = [];
  // let operators = [];
  // for (const i of arr) {
  //   if (i !== ')') {
  //     do {
  //       var op = operators.pop();
  //       if (op === '(') {
  //         break;
  //       }
  //       const a = values.pop();
  //       const b = values.pop();
  //       values.push(eval(`${a}${op}${b}`));
  //     } while (op !== '(');

  //   } else if (isNaN(i)) {
  //     operators.push(i);
  //   } else {
  //     values.push(i);
  //   }
  // }
  try {
    const val = eval(arr.join(' '));
  } catch (error) {
    formulaError = true;
  }
  if (formulaError) {
    return { formula: true };
  } else {
    return null;
  }


}
