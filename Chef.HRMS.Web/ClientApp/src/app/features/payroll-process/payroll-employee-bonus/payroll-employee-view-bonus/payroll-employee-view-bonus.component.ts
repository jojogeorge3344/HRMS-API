import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-payroll-employee-view-bonus',
  templateUrl: './payroll-employee-view-bonus.component.html',
  styleUrls: ['./payroll-employee-view-bonus.component.scss']
})
export class PayrollEmployeeViewBonusComponent implements OnInit {

  @Input() bonusTypes;
  @Input() PayrollProcessId;
  @Input() employeeId;
  @Input() bonus;
  date: any;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
