import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { Months } from 'src/app/models/common/types/months';
import { PayrollProcessAdhocService } from '../payroll-process-adhoc.service';
import { AdhocDeductionView } from '../payroll-process-adhoc-deduction-view.model';
import { PayrollCreateAdhocPaymentComponent } from '../payroll-create-adhoc-payment/payroll-create-adhoc-payment.component';
import { PayrollEditAdhocPaymentComponent } from '../payroll-edit-adhoc-payment/payroll-edit-adhoc-payment.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { PayrollViewAdhocPaymentComponent } from '../payroll-view-adhoc-payment/payroll-view-adhoc-payment.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'hrms-payroll-process-adhoc-list',
  templateUrl: './payroll-process-adhoc-list.component.html'
})
export class PayrollProcessAdhocListComponent implements OnInit {

  months = Months;
  month = Months;
  previousMonths = [];
  currentDate = new Date();
  selectedMonth: any;
  selectedYear: any;
  noOfCalendarDays: any;
  paygroupId: any;
  id: any;
  payGroupProcessAdhocDeduction: AdhocDeductionView[] = [];
  fromDate: string;
  toDate: string;
  currentUserId: number;
  payrollmonth:any
  payrollyear:any
  payrollcutoff:any

  constructor(
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private payrollProcessAdhocService: PayrollProcessAdhocService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.month = params.date.split('-')[0];
      this.noOfCalendarDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.paygroupId = params.payGroup;
      this.id = parseInt(params.id, 10);
      this.payrollmonth =  params.month
      this.payrollyear =params.year
      this.payrollcutoff = params.cutOffDay
    });
    this.getAllAdhocDeductionByPayGroupId();
  }

  // getAllAdhocDeductionByPayGroupId() {
  //   this.payrollProcessAdhocService.getAllAdhocDeduction(this.id, this.selectedMonth, this.selectedYear).subscribe(result => {
  //     this.payGroupProcessAdhocDeduction = result;
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.showErrorMessage('Unable to fetch the All Adhoc Deduction by PayGroup');
  //     });
  // }

  getAllAdhocDeductionByPayGroupId() {
    debugger
    // var fromdate = new Date(this.payrollyear,
    //   4-1, 25)
    // var todate = new Date(parseInt(this.payrollyear),
    //   parseInt(this.payrollmonth), parseInt(this.payrollcutoff))
    var month = parseInt(this.payrollmonth)
    var year = parseInt(this.payrollyear)
    var day = parseInt(this.payrollcutoff)
    var todate = new Date(year,month-1, day)
    var previous = new Date(todate.getTime());
    previous.setMonth(previous.getMonth() - 1);
    var payrollprocessMonth = parseInt(this.payrollmonth)
    var payrollmonth = payrollprocessMonth >= 10 ?  payrollprocessMonth : payrollprocessMonth < 10 ? '0' + payrollprocessMonth : 0
    //todate =  this.datePipe.transform(todate,"yyyy-MM-dd")
      this.noOfCalendarDays = new Date(this.payrollyear, this.payrollmonth, 0).getDate();
      this.payrollProcessAdhocService.getAllAdhocDeduction(this.paygroupId, `${this.payrollyear}-${payrollmonth}-01`,  `${this.payrollyear}-${payrollmonth}-${this.noOfCalendarDays}`).subscribe(result => {
      this.payGroupProcessAdhocDeduction = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the All Adhoc Deduction by PayGroup');
      });
  }

  openAdd() {
    const modalRef = this.modalService.open(PayrollCreateAdhocPaymentComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.processId = this.id;
    modalRef.componentInstance.payGroupProcessAdhocDeductionList = this.payGroupProcessAdhocDeduction;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllAdhocDeductionByPayGroupId();
      }
    });
  }

  openEditDeduction(adhocDeduction: AdhocDeductionView) {
    const modalRef = this.modalService.open(PayrollEditAdhocPaymentComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.adhocDeduction = adhocDeduction;
    modalRef.componentInstance.processId = this.id;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllAdhocDeductionByPayGroupId();
      }
    });
  }

  openViewDeduction(adhocDeduction: AdhocDeductionView) {
    const modalRef = this.modalService.open(PayrollViewAdhocPaymentComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.adhocDeduction = adhocDeduction;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllAdhocDeductionByPayGroupId();
      }
    });
  }

  deleteAdhocDeduction(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Adhoc Deduction ${name} ?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollProcessAdhocService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('Adhoc Deduction deleted successfully!');
          this.getAllAdhocDeductionByPayGroupId();
        });
      }
    });
  }

}
