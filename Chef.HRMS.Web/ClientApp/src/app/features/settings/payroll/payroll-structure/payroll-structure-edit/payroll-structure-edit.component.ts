import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { PayrollStructureService } from '../payroll-structure.service';
import { PayrollStructure } from '../payroll-structure.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-structure-edit',
  templateUrl: './payroll-structure-edit.component.html'
})
export class PayrollStructureEditComponent implements OnInit {


  currentUserId: number;
  editForm: FormGroup;

  @Input() payrollStructure: PayrollStructure;
  @Input() payrollStructureNames: string[];

  constructor(
    private payrollStructureService: PayrollStructureService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.payrollStructureService.update(this.editForm.value).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Payroll structure already exists!');
      } else {
        this.toastr.showSuccessMessage('Payroll structure added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the Payroll Structure');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.payrollStructure.id],
      name: [this.payrollStructure.name, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payrollStructureNames)
      ]],
      description: [this.payrollStructure.description, [
        Validators.required,
        Validators.maxLength(128),
      ]],
      createdBy: [this.payrollStructure.createdBy],
      createdDate: [this.payrollStructure.createdDate],
      modifiedBy: [this.currentUserId]
    });
  }

}
