import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import * as _ from 'lodash';

export function scrollToTop(scrollDuration: number) {
  const cosParameter = window.scrollY / 2;
  let scrollCount = 0;
  let oldTimestamp = performance.now();
  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) { window.scrollTo(0, 0); }
    if (window.scrollY === 0) { return; }
    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}


/* tslint:disable */
export function toggleFullscreen() {
  if (!document.fullscreenElement             /* Standard browsers */
    && !document['msFullscreenElement']       /* Internet Explorer */
    && !document['mozFullScreenElement']      /* Firefox */
    && !document['webkitFullscreenElement']   /* Chrome */
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement['msRequestFullscreen']) {
      document.documentElement['msRequestFullscreen']();
    } else if (document.documentElement['mozRequestFullScreen']) {
      document.documentElement['mozRequestFullScreen']();
    } else if (document.documentElement['webkitRequestFullscreen']) {
      document.documentElement['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    } else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    } else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    }
  }
}
/* tslint:enable */


// conditionaly apply css class to target
export function handleClassCondition(
  condition: boolean,
  className: string,
  el: HTMLElement
) {
  if (!condition && el.classList.contains(className)) {
    el.classList.remove(className);
  }
  if (condition && !el.classList.contains(className)) {
    el.classList.add(className);
  }
}

export function getCurrentUser() {
  if (localStorage.getItem('currentUser')) {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  return null;
}
export function getCurrentUserId() {
  debugger
  if (localStorage.getItem('currentUser')) {
  
    let a  =JSON.parse(localStorage.getItem('currentUser'))
    let empid =a[0].employeeId
   
    return empid
    return JSON.parse(localStorage.getItem('currentUser')).employeeId;
    // return 1
   
  }
  return 0;
}
export function getDateObject(str: string) {
  const d = new Date(str);
  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear()
  };
}
export function getDateString(obj: any) {
  return obj.year + '-' + obj.month.toString().replace(/^(\d)$/, '0$1') + '-' + obj.day;
}

export function padAtStrt(n, width, z) {
  z = z || '0';
  n = n + '';
  return String(n.replace(/^0+/, '')).padStart(width, '0');
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


export function PhoneNumberValidator(control: AbstractControl) {
  if (!(control.value && control.value.match('^\\+([0-9]){0,3}-[0-9]{5,12}$'))) {
    return { phone: true };
  }
  return null;
}
export function FileSizeValidator(control: AbstractControl) {
  if (control.value >= 2097152) {
    return { 'filesize': true };
  }
  return null;
}
export function FileTypeValidator(control: AbstractControl) {
  if (control.value !== 'pdf' && control.value !== 'png' && control.value !== 'jpeg' && control.value !== 'doc'
    && control.value !== 'docx') {
    return { 'filetype': true };
  }
  return null;
}
export function LeaveBalanceValidator(leaveBalance: Object[], noOfDays): ValidatorFn {
  return (control: AbstractControl) => {
    if (_.filter(leaveBalance, (o: any) => o.leaveBalance > noOfDays && o.leaveComponentName != 'Loss Of Pay').length == 0) {
      return { 'leaveBalance': true };
    }
    return null;
  };
}

export const customErrorMessages: ErrorMessage[] = [
  {
    error: 'phone',
    format: () => `Phone number should be in format '+countrycode-phone no.'`
  },
  {
    error: 'filesize',
    format: () => `File size should be less than 2Mb`
  },
  {
    error: 'filetype',
    format: () => `Please upload file having extensions .jpeg/.jpg/.png/.pdf/.doc/.docx only.`
  },
  {
    error: 'leaveBalance',
    format: () => `You do not have enough leave balance.`
  },
  {
    error: 'duplicate',
    format: duplicateFormat
  },
];
export function calculateDaysInBetween(fromDate, toDate) {

  let fromdateSec: any = fromDate;
  let todateSec: any = toDate;

  // this.isSingleDay = (todateSec - fromdateSec) === 0;

  // Calculate days between dates
  const millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  fromdateSec.setHours(0, 0, 0, 1); // Start just after midnight
  todateSec.setHours(23, 59, 59, 999); // End just before midnight

  const diff = todateSec - fromdateSec; // Milliseconds between datetime objects
  let days = Math.ceil(diff / millisecondsPerDay);

  // Subtract two weekend days for every week in between
  const weeks = Math.floor(days / 7);
  days = days - (weeks * 2);

  // Handle special cases
  fromdateSec = fromdateSec.getDay();
  todateSec = todateSec.getDay();

  // Remove weekend not previously removed.
  if (fromdateSec - todateSec > 1) {
    days = days - 2;
  }

  // Remove start day if span starts on Sunday but ends before Saturday
  if (fromdateSec == 0 && todateSec != 6) {
    days = days - 1;
  }

  // Remove end day if span ends on Saturday but starts after Sunday
  if (todateSec === 6 && fromdateSec !== 0) {
    days = days - 1;
  }
  return days;
}
export function duplicateFormat(label: string, error: any): string {
  return `${label} already exists.`;
}
export function getNoOfWeekoffsInMonth(month: number, year: number, weekoffs: [number, number]) {
  const noofDays = new Date(year, month, 0).getDate();
  const startingDay = new Date(year, month - 1, 1).getDay();
  if (noofDays === 28) {
    return 8;
  } else if (noofDays === 29) {
    if (startingDay === weekoffs[0] || startingDay === weekoffs[1]) {
      return 9;
    } else {
      return 8;
    }
  } else if (noofDays === 30) {
    let noOfweekofs = 8;
    for (let i = 0; i < 2; i++) {
      if (weekoffs.find(x => x === ((startingDay + i) % 7)) !== undefined) {
        noOfweekofs++;
      }
    }
    return noOfweekofs;
  } else {
    let noOfweekofs = 8;
    for (let i = 0; i < 3; i++) {
      if (weekoffs.find(x => x === ((startingDay + i) % 7)) !== undefined) {
        noOfweekofs++;
      }
    }
    return noOfweekofs;
  }
}

