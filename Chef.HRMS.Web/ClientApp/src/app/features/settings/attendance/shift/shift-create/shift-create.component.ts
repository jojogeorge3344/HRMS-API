import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { ShiftService } from '../shift.service';
import { Shift } from '../shift.model';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-shift-create',
  templateUrl: './shift-create.component.html'
})
export class ShiftCreateComponent implements OnInit {

  addForm: FormGroup;
  fromTime: NgbTimeStruct;
  toTime: NgbTimeStruct;
  currentUserId: number;

  startDate: Date;
  endDate: Date;

  fromGraceHr:NgbTimeStruct;
  toGraceHr:NgbTimeStruct;

  fromGraceDate:Date;
  toGraceDate:Date;



  @Input() shiftNames: string[];
  dotCount: number;
  checkNumberOnly: any;
  checkString: any;

  constructor(
    private shiftService: ShiftService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {

    this.fromTime = { hour: 9, minute: 0, second: 0 };
    this.toTime = { hour: 18, minute: 0, second: 0 };

    this.fromGraceHr = { hour: 9, minute: 0, second: 0 };
    this.toGraceHr = { hour: 18, minute: 0, second: 0 };

    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();

    this.setTime();
    this.setGraceHrTime();
  }

  setTime() {
    if (this.fromTime && this.toTime) {
      const currentDate = new Date();
      this.startDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.fromTime.hour, this.fromTime.minute));

      console.log(this.startDate.toISOString().split('.')[0])
      this.endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.toTime.hour, this.toTime.minute));

      if (this.startDate > this.endDate) {
        this.endDate.setDate(this.endDate.getDate() + 1);
      }

      this.addForm.patchValue({ startTime: this.startDate.toISOString().split('.')[0], endTime: this.endDate.toISOString().split('.')[0] });
    } else {
      this.addForm.patchValue({ startTime: null, endTime: null });
    }
    this.setWorkingHours()
  }

  setGraceHrTime() {
    if (this.fromGraceHr && this.toGraceHr) {
      const currentDate = new Date();
      this.fromGraceDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.fromGraceHr.hour, this.fromGraceHr.minute));
      this.toGraceDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.toGraceHr.hour, this.toGraceHr.minute));

      if (this.fromGraceDate > this.toGraceDate) {
        this.toGraceDate.setDate(this.toGraceDate.getDate() + 1);
      }

      this.addForm.patchValue({ gracestarttime: this.fromGraceDate.toISOString().split('.')[0], graceendtime: this.toGraceDate.toISOString().split('.')[0] });
    } else {
      this.addForm.patchValue({ gracestarttime: 0, graceendtime: 0 });
    }

    
  }

  

  setWorkingHours(){

    const diffInMs = Date.parse(this.addForm.value.endTime) - Date.parse(this.addForm.value.startTime);
    const diffInHours = diffInMs / 1000 / 60 / 60
    const diffMinutes = diffInMs / 1000 / 60 % 60
    const hrValue = Math.trunc(diffInHours) >= 10 ? Math.trunc(diffInHours) : '0'+Math.trunc(diffInHours)
    const minValue = diffMinutes >= 10 ? diffMinutes : '0' +diffMinutes
    //this.addForm.patchValue({workinghours  : Math.trunc(diffInHours) + ':' + diffMinutes})
    this.addForm.patchValue({workinghours  : hrValue + ':' + minValue})

  }


 // numberOnly(event)

  numberOnly(event) {
debugger
    var charCode = (event.which) ? event.which : event.keyCode;
    
   // Only Numbers 0-9
    if(charCode == 58){
      return true;
    }
    else if ((charCode < 48 || charCode > 57)) {
    
     event.preventDefault();
    
    return false;
    
    } else {
    
    return true;
    
     }
    
     }


  // numberOnly(event): boolean {   
  //   debugger   
  //   const charCode = (event.which) ? event.which : event.keyCode;   
   
  //   if (charCode == 46) {
  //       this.dotCount += 1;
  //       this.checkNumberOnly = (event.target.value);
  //       var numericCheck = (event.target.value).toString();
  //       if (numericCheck.includes('.')) {
  //           this.dotCount += 1;
  //       }
  //       if (this.dotCount > 1) {   
  //           this.dotCount = 0;
  //           return false;
  //       }
  //   }
  //   if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode==47)) {
  //       return false;
  //   }
  //   this.checkNumberOnly = (event.target.value);
  //   if (this.checkNumberOnly != null) {
  //       var numeric = (event.target.value).toString();
  //       if (numeric.includes('.')) {
  //           var checkNumeric = numeric.split('.');
  //           if (checkNumeric.length > 2) {
  //               return false;
  //           }
  //           this.checkString = checkNumeric[1].split('');
  //           if (this.checkString.length > 1) {
  //               return false;
  //           }
  //       }

  //   }
   
  // }

  onSubmit() {

    var data = this.addForm.value.minimumhours.toString()
    data =   data.includes('.') ? this.addForm.value.minimumhours.replace('.',':') : this.addForm.value.minimumhours + ':0'

    this.addForm.patchValue({ minimumhours : data})

    this.shiftService.add(this.addForm.value).subscribe((result: Shift) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Shift name already exists!');
      } else {
        this.toastr.showSuccessMessage('Shift added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add shift');
      });
  }

  get name() { return this.addForm.get('name'); }

  get startTime() { return this.addForm.get('startTime'); }

  get endTime() { return this.addForm.get('endTime'); }

  get gracestarttime() { return this.addForm.get('gracestarttime'); }

  get graceendtime() { return this.addForm.get('graceendtime'); }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(26),
        Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.shiftNames)
      ]],
      startTime: [null, [
        Validators.required
      ]],
      endTime: [null, [
        Validators.required
      ]],
      breakDuration: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]],
      numberOfDays: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(7)
      ]],
      comments: [null, [
        Validators.maxLength(256)
      ]],
      workinghours:[null],
      minimumhours:[null,[
        Validators.required]],
      gracestarttime: [0],
      graceendtime: [0],
    }, { validators: durationValidator });
  }

}

const durationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startTime = control.get('startTime');
  const endTime = control.get('endTime');

  const duration = (new Date(endTime.value).getTime() - new Date(startTime.value).getTime()) / 3600000;

  return (duration > 16 || duration < 5) ? { duration: true } : null;
};






