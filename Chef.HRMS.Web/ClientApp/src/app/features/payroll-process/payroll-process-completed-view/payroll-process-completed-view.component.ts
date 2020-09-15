import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PayrollProcessService } from '../payroll-process.service';
import { PayrollReview } from '../payroll-process-preview/payroll-process-preview.model';

@Component({
  selector: 'hrms-payroll-process-completed-view',
  templateUrl: './payroll-process-completed-view.component.html',
  styles: [
  ]
})
export class PayrollProcessCompletedViewComponent implements OnInit {
  @Input() id: number;
  payrollBreakUp: PayrollReview[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService
  ) {
  }

  ngOnInit(): void {
    this.payrollProcessService.getPayrollBreakUp(this.id).subscribe(res => {
      this.payrollBreakUp = res;
    });
  }

}
