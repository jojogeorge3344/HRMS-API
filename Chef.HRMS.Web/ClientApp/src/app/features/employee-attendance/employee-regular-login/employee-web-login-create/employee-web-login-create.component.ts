import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegularLoginService } from '../employee-regular-login.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-web-login-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeWebLoginCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;

  constructor(
    private employeeRegularLoginService: EmployeeRegularLoginService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
    this.employeeRegularLoginService.add(this.addForm.value).subscribe(result => {
      localStorage.setItem('clockIn', JSON.stringify(result));
      this.toastr.showSuccessMessage('Web Clock "In" success');
      this.activeModal.close('submit');
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to Web Clock "In"');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: this.currentUserId,
      checkInTime: [new Date(Date.now())],
      checkOutTime: [new Date(Date.now())],
      checkInComment: ['', [
        Validators.required,
        Validators.maxLength(64),
      ]],
      isRemoteLogin: [false],
      // createdBy: [this.currentUserId],
      // modifiedBy: [this.currentUserId]
    });
  }

}
