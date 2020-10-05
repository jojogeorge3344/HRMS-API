import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeDependentDetailsService } from '../employee-dependent-details.service';
import { GenderType } from '../../../../models/common/types/gendertype';
import { RelationshipType } from '../../../../models/common/types/relationshiptype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-dependent-details-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeDependentDetailsCreateComponent implements OnInit {

  @Input() currentUserId: number;
  addForm: FormGroup;

  genderTypes = GenderType;
  relationshipTypes = RelationshipType;

  genderTypeKeys: number[];
  relationshipTypeKeys: number[];
  maxDate;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private dependentService: EmployeeDependentDetailsService,
    public activeModal: NgbActiveModal) {
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.relationshipTypeKeys = Object.keys(this.relationshipTypes).filter(Number).map(Number);
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.currentUserId = getCurrentUserId();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      dateOfBirth: [null, [
        Validators.required,
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      phone: ['', [Validators.maxLength(16)
      ]],
      phoneCode: [],
      gender: [null, [
        Validators.required,
      ]],
      relationship: [null, [
        Validators.required,
      ]],
      profession: ['', [

      ]],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }
  onSubmit() {
    const addDependentForm = this.addForm.value;

    if (addDependentForm.phoneCode && addDependentForm.phone) {
      addDependentForm.phone = `+${addDependentForm.phoneCode}-${addDependentForm.phone}`;
    } else {
      addDependentForm.phone = '';
    }

    addDependentForm.employeeId = this.currentUserId;

    this.dependentService.insert(addDependentForm).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Dependent already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Dependent is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Dependent');
      });

  }

}