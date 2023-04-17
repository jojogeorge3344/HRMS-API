import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PayrollStructureService } from '../payroll-structure.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-structure-create',
  templateUrl: './payroll-structure-create.component.html'
})
export class PayrollStructureCreateComponent implements OnInit {

  currentUserId: number;
  addForm: FormGroup;

  @Input() payrollStructureNames: string[];


  constructor(
    private payrollStructureService: PayrollStructureService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.payrollStructureService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Payroll structure already exists!');
      } else {
        this.toastr.showSuccessMessage('Payroll component added successfully!');
        this.activeModal.close(result);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Payroll Structure');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payrollStructureNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
    });
  }

}
