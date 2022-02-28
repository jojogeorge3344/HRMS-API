import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeWpsService } from '../employee-wps.service';
import { WpsGroup } from '../wps-model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-wps-edit',
  templateUrl: './employee-wps-edit.component.html',
  styleUrls: ['./employee-wps-edit.component.scss']
})
export class EmployeeWpsEditComponent implements OnInit {

  addForm: FormGroup;
  @Input() wpsDetails: WpsGroup;
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
    this.addForm.patchValue(this.wpsDetails);
  }

  onSubmit() {
    const wpsForm = this.addForm.value;
    this.employeeWpsService.update(wpsForm).subscribe(result => {
      this.toastr.showSuccessMessage('The WPS Updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the WPS');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: this.wpsDetails.id,
      groupCode: ['', [
        Validators.maxLength(14),
        Validators.required
        //duplicateNameValidator(this.groupCodes)
      ]],
      groupName: ['', [
        Validators.maxLength(64),
        Validators.required
        //duplicateNameValidator(this.groupNames)
      ]],
      establishmentId: ['', [
        Validators.pattern(/^\d{1,3}$/),
        Validators.maxLength(3),
        Validators.required
        //duplicateNameValidator(this.establishmentId)
      ]],
      remarks: ['', [
        Validators.maxLength(128),
        Validators.required
      ]],
    });
  }


}
