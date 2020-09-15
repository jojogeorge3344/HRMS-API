import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollProcessPreviewBreakUpService } from '../payroll-process-preview-break-up.service';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Months } from 'src/app/models/common/types/months';
import { PayrollProcessPreviewServiceService } from '../payroll-process-preview-service.service';
import { PayrollReview } from '../payroll-process-preview.model';
import { LoanType } from 'src/app/models/common/types/loantype';
import { PayrollLopService } from '../payroll-lop.service';

@Component({
  selector: 'hrms-payroll-process-preview-split',
  templateUrl: './payroll-process-preview-split.component.html',
  styleUrls: ['./payroll-process-preview-split.component.scss']
})
export class PayrollProcessPreviewSplitComponent implements OnInit {

  months = Months;
  month = Months;
  currentDate = new Date();
  selectedMonth: any;
  selectedYear: any;
  paygroupId: any;
  id: any;
  @Input() employeeId: number;
  payrollBreakUp: any;
  payBreakUp: PayrollReview[];
  @Input() preview: PayrollReview;
  loanType = LoanType;
  basic = { type: '', values: [], sum: 0 };
  bonus = { type: '', values: [], sum: 0 };
  lop;
  adhoc = { type: '', values: [], sum: 0 };

  constructor(
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private payrollLopService: PayrollLopService,
    private payrollProcessPreviewServiceService: PayrollProcessPreviewServiceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1]
      this.selectedMonth = this.months[params.date.split('-')[0]]
      this.month = params.date.split('-')[0]
      this.paygroupId = params.payGroup;
      this.id = params.id;
    });
    this.getPayBreakUpByEmployeeId();
  }

  getPayBreakUpByEmployeeId() {
    this.payrollLopService.getEmployeeLop(this.employeeId, this.id)
      .subscribe(res =>
        this.lop = res
    );
    this.payrollProcessPreviewServiceService.getEmployeeBreakup(this.employeeId, this.id)
      .subscribe((res: any) => {
        res.map(group => {
          group.sum = group.values.reduce((sum, x) => sum + x.amount, 0);
          return group;
        });
        if (res.find(component => component.type === 'Basic')) {
          this.basic = res.find(component => component.type === 'Basic');
        }
        if (res.find(component => component.type === 'Bonus')) {
          this.bonus = res.find(component => component.type === 'Bonus');
        }
        if (res.find(component => component.type === 'Adhoc')) {
          this.adhoc = res.find(component => component.type === 'Adhoc');
        }
      });
  }

}
