import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PayrollConfigurationService } from '../payroll-configuration.service';
import { PayrollComponentType } from 'src/app/models/common/types/payrollcomponenttype';
import { PayrollConfiguration } from '../payroll-configuration.model';
import { PayrollStructure } from '../../payroll-structure/payroll-structure.model';
import { PayrollStructureService } from '../../payroll-structure/payroll-structure.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-configuration-container',
  templateUrl: './payroll-configuration-container.component.html'
})
export class PayrollConfigurationContainerComponent implements OnInit {

  selected: number = null;
  currentType: number = null;
  payrollComponentTypes = PayrollComponentType;
  assignedPayrollComponents: PayrollConfiguration[];
  payrollStructure: PayrollStructure;
  currentPayrollConfiguration: PayrollConfiguration;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    private payrollStructureService: PayrollStructureService,
    private payrollConfigurationService: PayrollConfigurationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getPayrollStructure(params.id);
    });
  }

  getPayrollStructure(id) {
    this.payrollStructureService.get(id).subscribe((result) => {
      this.payrollStructure = result;
      this.getPayrollComponents(this.payrollStructure.id);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll structure');
      });
  }

  getPayrollComponents(payrollStructureId) {
    this.payrollConfigurationService.getAll(payrollStructureId).subscribe((result: any) => {
      this.assignedPayrollComponents = result;
      this.selectPayrollComponent(0);
    },
      error => {
        console.error(error);
      });
  }

  selectPayrollComponent(index) {
    this.selected = index;
    this.currentType = this.assignedPayrollComponents[index].payrollComponentType;
    this.currentPayrollConfiguration = this.assignedPayrollComponents[index];
  }

  isLastStep(): boolean {
    return this.selected === (this.assignedPayrollComponents.length - 1);
  }

  isAllConfigured(): boolean {
    return this.assignedPayrollComponents.every(e => e.isConfigured);
  }

  onSubmit(updatedPayrollConfiguration) {
    this.assignedPayrollComponents[this.selected] = updatedPayrollConfiguration;

    if (this.isAllConfigured() && this.isLastStep()) {
      this.router.navigate(['settings/payroll/payroll-structure'], { queryParams: { payrollStructureId: this.payrollStructure.id } });
    }
    this.selectPayrollComponent(this.selected + 1);
  }
}
