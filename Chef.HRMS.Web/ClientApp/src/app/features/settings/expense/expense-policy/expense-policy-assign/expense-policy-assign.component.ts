import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { ExpenseConfigurationService } from '../../expense-configuration/expense-configuration.service';
import { ExpenseType } from '../../expense-type/expense-type.model';
import { ExpensePolicy } from '../expense-policy.model';
import { ExpenseConfiguration } from '../../expense-configuration/expense-configuration.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-policy-assign',
  templateUrl: './expense-policy-assign.component.html'
})
export class ExpensePolicyAssignComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  isMatch: boolean;
  isEmpty = false;

  @Input() expensePolicy: ExpensePolicy;
  @Input() assignedExpenseTypes: ExpenseConfiguration[];
  @Input() allExpenseTypes: ExpenseType[];

  constructor(
    private expenseConfigurationService: ExpenseConfigurationService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addCheckboxes();
  }

  onSubmit() {
    const selectedTypes = [];
    const removedTypes = [];
    let expenseCount = 0;

    this.addForm.value.types.forEach((type, i) => {

      const currentExpenseType = this.assignedExpenseTypes.find(e => e.expenseTypeId === this.allExpenseTypes[i].id);

      if (type && !currentExpenseType) {
        const selectedType = {
          expensePolicyId: this.expensePolicy.id,
          expenseTypeId: this.allExpenseTypes[i].id,
          category: this.allExpenseTypes[i].category,
          name: this.allExpenseTypes[i].name,
          code: this.allExpenseTypes[i].code,
          currency: this.expensePolicy.currency,
          expensePolicyName: this.expensePolicy.name,
          createdBy: this.currentUserId,
          modifiedBy: this.currentUserId
        };
        selectedTypes.push(selectedType);
      } else if (!type && currentExpenseType) {
        removedTypes.push(currentExpenseType.id);
      }
      if (type) {
        expenseCount++;
      }
    });

    if (expenseCount === 0) {
      this.isEmpty = true;
    } else {
      this.expenseConfigurationService.add(selectedTypes, removedTypes).subscribe(() => {
        if (selectedTypes.length === 0 && this.expensePolicy.isConfigured) {
          this.router.navigate(['settings/expense/expense-policy'], {
            queryParams: {
              expensePolicyId: this.expensePolicy.id
            }
          });
        } else {
          this.router.navigate(['settings/expense/' + this.expensePolicy.id + '/expense-policy-configuration/']);
        }
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to assign the expense types');
        });
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      types: new FormArray([])
    });
  }

  private addCheckboxes() {

    this.allExpenseTypes.forEach((allExpenseType: ExpenseType) => {

      this.isMatch = this.assignedExpenseTypes.some((assignedExpenseType) => {
        return assignedExpenseType.expenseTypeId === allExpenseType.id;
      });

      (this.addForm.controls.types as FormArray).push(new FormControl(this.isMatch));
    });
  }
}
