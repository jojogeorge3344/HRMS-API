import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PayrollConfigurationService } from '../payroll-configuration.service';
import { PayrollComponentType } from 'src/app/models/common/types/payrollcomponenttype';
import { PayrollConfiguration } from '../payroll-configuration.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './payroll-configuration-edit.component.html'
})
export class PayrollConfigurationEditComponent implements OnInit {

  payrollComponentType = 0;
  payrollStructure = '';
  payrollComponent = '';
  payrollComponentTypes = PayrollComponentType;
  payrollConfiguration: PayrollConfiguration;
  isView = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    private payrollConfigurationService: PayrollConfigurationService) { }

  ngOnInit(): void {
    debugger
    console.log(this.payrollConfiguration)
    this.isView = (this.route.snapshot.url[1].path === 'view');
    this.route.params.subscribe(params => {
      this.payrollConfigurationService.getAllPayRoll(params.id).subscribe((result:any) => {
        let a=result.filter(x=>x.payrollStructureId==this.payrollConfiguration.payrollStructureId)
        this.payrollConfiguration = a;
        this.payrollComponentType = a.payrollComponentType;
        this.payrollComponent = a.name;
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll component configuration');
      });
    });
  }

  onSubmit() {
    this.router.navigate(
      ['settings/payroll/payroll-structure'],
      { queryParams: { payrollStructureId: this.payrollConfiguration.payrollStructureId } });
  }
}
