import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { ShiftService } from '../shift.service';
import { Shift } from '../shift.model';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-shift-edit',
  templateUrl: './shift-edit.component.html'
})
export class ShiftEditComponent implements OnInit {

  editForm: FormGroup;
  fromTime: NgbTimeStruct;
  toTime: NgbTimeStruct;
  currentUserId: number;

  graceStartHr:NgbTimeStruct;
  graceEndHr:NgbTimeStruct;

  startDate: Date;
  endDate: Date;

  graceStartDate: Date;
  graceEndDate: Date;

  workingHr:string;
  minimunHr:string;


  @Input() shiftNames: string[];
  @Input() shift: Shift;
  @Input() isDisabled: boolean;

  constructor(
    private shiftService: ShiftService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {

  
    this.fromTime = {
      hour: new Date(this.shift.startTime).getHours(),
      minute: new Date(this.shift.startTime).getMinutes(),
      second: 0
    };
    this.toTime = {
      hour: new Date(this.shift.endTime).getHours(),
      minute: new Date(this.shift.endTime).getMinutes(),
      second: 0
    };

    this.graceStartHr = {
      hour: new Date(this.shift.graceStartTime).getHours(),
      minute: new Date(this.shift.graceStartTime).getMinutes(),
      second: 0
    };
    this.graceEndHr = {
      hour: new Date(this.shift.graceEndTime).getHours(),
      minute: new Date(this.shift.graceEndTime).getMinutes(),
      second: 0
    };

    this.currentUserId = getCurrentUserId();

    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.shift);
    this.setTime();
    this.setGraceHours()
    
    // this.editForm.patchValue({
    //   workingHours: new Date(this.shift.workingHours).getHours() + ':' +  new Date(this.shift.workingHours).getMinutes(), 
    // })

    // this.editForm.patchValue({
    //   minimumHours: new Date(this.shift.minimumHours).getHours() + ':' +  new Date(this.shift.minimumHours).getMinutes(), 
    // })
    // this.workingHr =  new Date(this.shift.workingHours).getHours() + ':' +  new Date(this.shift.workingHours).getMinutes()
    
    this.minimunHr = new Date(this.shift.minimumHours).getHours() + ':' +  new Date(this.shift.minimumHours).getMinutes()
  }

  setTime() {
    if (this.fromTime && this.toTime) {
      const currentDate = new Date();
      this.startDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.fromTime.hour, this.fromTime.minute));
      this.endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.toTime.hour, this.toTime.minute));

      if (this.startDate > this.endDate) {
        this.endDate.setDate(this.endDate.getDate() + 1);
      }

      this.editForm.patchValue({ startTime: this.startDate.toISOString().split('.')[0], endTime: this.endDate.toISOString().split('.')[0] });
    } else {
      this.editForm.patchValue({ startTime: null, endTime: null });
    }
    this.setWorkingHours()
  }


  setGraceHours() {
    if (this.graceStartHr && this.graceEndHr) {
      const currentDate = new Date();
      this.graceStartDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.graceStartHr.hour, this.graceStartHr.minute));
      this.graceEndDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.graceEndHr.hour, this.graceEndHr.minute));

      if (this.graceStartDate > this.graceEndDate) {
        this.graceEndDate.setDate(this.graceEndDate.getDate() + 1);
      }

      this.editForm.patchValue({ graceStartTime: this.graceStartDate.toISOString().split('.')[0], graceEndTime: this.graceEndDate.toISOString().split('.')[0] });
    } else {
      this.editForm.patchValue({ graceStartTime: 0, graceEndTime: 0 });
    }
  }

  setWorkingHours(){

    const diffInMs = Date.parse(this.editForm.value.endTime) - Date.parse(this.editForm.value.startTime);
    const diffInHours = diffInMs / 1000 / 60 / 60
    const diffMinutes = diffInMs / 1000 / 60 % 60
  //  this.editForm.patchValue({workingHours  : Math.trunc(diffInHours) + ':' + diffMinutes})
   // this.workingHr =   Math.trunc(diffInHours) + ':' + diffMinutes 
    const hrValue = Math.trunc(diffInHours) >= 10 ? Math.trunc(diffInHours) : '0'+Math.trunc(diffInHours)
    const minValue = diffMinutes >= 10 ? diffMinutes : '0' +diffMinutes
    this.workingHr = hrValue + ':' +minValue
  }


  onSubmit() {


    this.editForm.patchValue({
      workingHours: this.workingHr, 
    })

    this.editForm.patchValue({
      minimumHours: this.minimunHr 
    })
    this.shiftService.update(this.editForm.getRawValue()).subscribe((result: number) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Shift name already exists!');
      } else {
        this.toastr.showSuccessMessage('Shift updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update shift');
      });
  }

  get name() { return this.editForm.get('name'); }

  get startTime() { return this.editForm.get('startTime'); }

  get endTime() { return this.editForm.get('endTime'); }

  get graceStartTime() { return this.editForm.get('graceStartTime');}
  
  get graceEndTime() {return this.editForm.get('graceEndTime');}

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null, [
        Validators.required,
        Validators.maxLength(26),
        Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.shiftNames)
      ]],
      startTime: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      endTime: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      breakDuration: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]],
      numberOfDays: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.min(1),
        Validators.max(7)
      ]],
      comments: [null, [
        Validators.maxLength(256)
      ]],
      graceStartTime: [{ value: 0, disabled: this.isDisabled }],
      graceEndTime: [{ value: 0, disabled: this.isDisabled }],
      workingHours:[null],
      createdDate: [],
      minimumHours:[null,[
        Validators.required]]
    }, { validators: durationValidator });
  }
}

const durationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startTime = control.get('startTime');
  const endTime = control.get('endTime');

  const duration = (new Date(endTime.value).getTime() - new Date(startTime.value).getTime()) / 3600000;

  return (duration > 16 || duration < 5) ? { duration: true } : null;
};
