import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-payroll-settings-container',
  templateUrl: './payroll-settings-container.component.html'
})
export class PayrollSettingsContainerComponent implements OnInit {

  tabs = [
    { title: 'Payroll Calendar', fragment: 'payroll-calendar' },
    { title: 'Pay Group', fragment: 'pay-group' },
    { title: 'Payroll Component', fragment: 'payroll-component' },
    { title: 'Payroll Structure', fragment: 'payroll-structure' },
    { title: 'Payroll Calculation', fragment: 'payroll-calculation' },
    { title: 'Payslip Configuration', fragment: 'payslip-configuration' },
    { title: 'LOP Calculation', fragment: 'payroll-lop-settings' },
    { title: 'Variables', fragment: 'user-variable' },
    //{ title: 'System Variable', fragment: 'system-variable' }
  ];
  
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
