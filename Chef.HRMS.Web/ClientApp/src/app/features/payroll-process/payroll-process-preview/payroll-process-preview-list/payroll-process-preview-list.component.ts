import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Months } from 'src/app/models/common/types/months';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { PayrollProcessPreviewSplitComponent } from '../payroll-process-preview-split/payroll-process-preview-split.component';
import { PayrollProcessPreviewServiceService } from '../payroll-process-preview-service.service';
import { PayrollReview } from '../payroll-process-preview.model';
import { PayrollProcessService } from '../../payroll-process.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-preview-list',
  templateUrl: './payroll-process-preview-list.component.html',
  styleUrls: ['./payroll-process-preview-list.component.scss']
})
export class PayrollProcessPreviewListComponent implements OnInit {

  months = Months;
  month = Months;
  currentDate = new Date();
  selectedMonth: any;
  selectedYear: any;
  paygroupId: any;
  id: any;
  currentUserId: number;
  payrollPreview: PayrollReview[] = [];

  constructor(
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private payrollProcessPreviewServiceService: PayrollProcessPreviewServiceService
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.month = params.date.split('-')[0];
      this.paygroupId = params.payGroup;
      this.id = parseInt(params.id, 10);
    });
    this.GetAllPayrollReviewByProcessingMethodId();
  }

  GetAllPayrollReviewByProcessingMethodId() {
    this.payrollProcessPreviewServiceService.getAllPayrollReview(this.id).subscribe(result => {
      this.payrollPreview = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Payroll Preview');
      });
  }


  openPreview(preview, employeeId) {
    const modalRef = this.modalService.open(PayrollProcessPreviewSplitComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.preview = preview;
    modalRef.componentInstance.employeeId = employeeId;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.GetAllPayrollReviewByProcessingMethodId();
      }
    });
  }

  onSubmit() {
    let lop = this.payrollPreview.map(employee => {
      return {
        employeeId: employee.employeeId,
        numberOfDays: employee.lopCount,
        lOPAmount: employee.lopAmount,
        payrollProcessingMethodId: this.id
      };
    });
    lop = lop.filter(emp => emp.lOPAmount !== 0);

    this.payrollProcessService.updateProcessedStep(this.id, 5, { id: this.id, stepNumber: 5 })
      .subscribe(res => {
        if (res) {
          if (lop && lop.length) {
            this.payrollProcessService.insertLop(lop)
              .subscribe(() => {
                return this.endpayrollProcess();
              });
          } else {
            this.endpayrollProcess();
          }

        }
      });
  }
  endpayrollProcess(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.toastr.showSuccessMessage('Payroll Process Completed');
  }

}
