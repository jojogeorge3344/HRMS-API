import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-payroll-employee-view-loan-advances',
  templateUrl: './payroll-employee-view-loan-advances.component.html',
  styleUrls: ['./payroll-employee-view-loan-advances.component.scss']
})
export class PayrollEmployeeViewLoanAdvancesComponent implements OnInit {

  @Input() loanTypes: any;
  @Input() employeeLoan: any;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
