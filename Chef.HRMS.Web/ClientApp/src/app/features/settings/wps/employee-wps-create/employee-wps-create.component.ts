import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeWpsService } from '../employee-wps.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-wps-create',
  templateUrl: './employee-wps-create.component.html',
  styleUrls: ['./employee-wps-create.component.scss']
})
export class EmployeeWpsCreateComponent implements OnInit {

  addForm: FormGroup;
  @Input() groupCodes: string[];
  @Input() groupNames: string[];
  @Input() establishmentId: string[];

  constructor(
    private employeeWpsService: EmployeeWpsService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
    const wpsForm = this.addForm.value;
    this.employeeWpsService.add(wpsForm).subscribe(result => {
      this.toastr.showSuccessMessage('The WPS added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the WPS');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      groupCode: ['', [
        Validators.maxLength(32),
        Validators.required,
        duplicateNameValidator(this.groupCodes)
      ]],
      groupName: ['', [
        Validators.maxLength(64),
        Validators.required,
        duplicateNameValidator(this.groupNames)
      ]],
      establishmentId: ['', [
        Validators.pattern(/^\d{1,3}$/),
        Validators.maxLength(13),
        Validators.required,
        duplicateNameValidator(this.establishmentId)
      ]],
      remarks: ['', [Validators.maxLength(128), Validators.required]],
    });
  }

}