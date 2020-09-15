import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdhocDeductionView } from '../payroll-process-adhoc-deduction-view.model';

@Component({
  selector: 'hrms-payroll-view-adhoc-payment',
  templateUrl: './payroll-view-adhoc-payment.component.html'
})
export class PayrollViewAdhocPaymentComponent implements OnInit {

  adhocDeductionById: any;
  @Input() adhocDeduction : AdhocDeductionView;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }


}
