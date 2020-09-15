import { Component, OnInit, Input } from '@angular/core';
import { AdhocDeductionView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc-deduction-view.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-payroll-view-adhoc',
  templateUrl: './payroll-view-adhoc.component.html',
  styles: [
  ]
})
export class PayrollViewAdhocComponent implements OnInit {
  @Input() adhocDeduction: AdhocDeductionView;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
