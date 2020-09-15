import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { PayrollConfigurationService } from '../../payroll-configuration/payroll-configuration.service';
import { PayrollComponent } from '../../payroll-component/payroll-component.model';
import { PayrollStructure } from '../payroll-structure.model';
import { PayrollConfiguration } from '../../payroll-configuration/payroll-configuration.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import * as _ from 'lodash';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-structure-assign',
  templateUrl: './payroll-structure-assign.component.html'
})
export class PayrollStructureAssignComponent implements OnInit {

  addForm: FormGroup;
  isMatch: boolean;
  isEmpty = false;
  currentUserId: number;
  newArr;

  @Input() payrollStructure: PayrollStructure;
  @Input() assignedPayrollComponents: PayrollConfiguration[];
  @Input() allPayrollComponents: PayrollComponent[];

  constructor(
    private payrollConfigurationService: PayrollConfigurationService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    console.log('newArr', this.allPayrollComponents);
    this.newArr = _.chain(this.allPayrollComponents)
      .groupBy('payrollComponentType')
      // .map((value:any, key) => ({ payrollComponentType: key, structureId:value[0].payrollStructureId, components: value }))
      .value();

    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addCheckboxes();
  }

  onSubmit() {
    const selectedTypes = [];
    const removedTypes = [];
    let componentCount = 0;

    this.addForm.value.types.forEach((type, i) => {

      const currentPayrollComponent = this.assignedPayrollComponents.find(e => e.payrollComponentId === this.allPayrollComponents[i].id);

      if (type && !currentPayrollComponent) {
        const selectedType = {
          payrollStructureId: this.payrollStructure.id,
          payrollComponentId: this.allPayrollComponents[i].id,
          payrollComponentType: this.allPayrollComponents[i].payrollComponentType,
          name: this.allPayrollComponents[i].name,
          shortCode: this.allPayrollComponents[i].shortCode,
          createdBy: this.currentUserId,
          modifiedBy: this.currentUserId
        };
        selectedTypes.push(selectedType);
      } else if (!type && currentPayrollComponent) {
        removedTypes.push(currentPayrollComponent.id);
      }

      if (type) {
        componentCount++;
      }
    });

    if (componentCount === 0) {
      this.isEmpty = true;
    } else {
      this.payrollConfigurationService.add(selectedTypes, removedTypes).subscribe(() => {
        if (selectedTypes.length === 0 && this.payrollStructure.isConfigured) {
          this.router.navigate(['settings/payroll/payroll-structure'], {
            queryParams: {
              payrollStructureId: this.payrollStructure.id
            }
          });
        } else {
          this.router.navigate(['settings/payroll/' + this.payrollStructure.id + '/payroll-configuration/']);
        }
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to assign the payroll components');
        });
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      types: new FormArray([])
    });
  }

  private addCheckboxes() {

    this.allPayrollComponents.forEach((allPayrollComponent: PayrollComponent) => {

      this.isMatch = this.assignedPayrollComponents.some((assignedPayrollComponent) => {
        return assignedPayrollComponent.payrollComponentId === allPayrollComponent.id;
      });

      (this.addForm.controls.types as FormArray).push(new FormControl(this.isMatch));
    });
  }
}
