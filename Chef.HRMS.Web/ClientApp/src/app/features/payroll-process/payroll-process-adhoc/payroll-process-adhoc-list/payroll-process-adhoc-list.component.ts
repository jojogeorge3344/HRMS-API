import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'hrms-payroll-process-adhoc-list',
  templateUrl: './payroll-process-adhoc-list.component.html'
})
export class PayrollProcessAdhocListComponent implements OnInit, OnDestroy {

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

  constructor(
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private payrollProcessAdhocService: PayrollProcessAdhocService,
  ) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.month = params.date.split('-')[0];
      this.noOfCalendarDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.paygroupId = params.payGroup;
      this.id = parseInt(params.id, 10);
    });
    this.getAllAdhocDeductionByPayGroupId();
  }

  getAllAdhocDeductionByPayGroupId() {
    this.payrollProcessAdhocService.getAllAdhocDeduction(this.id, this.selectedMonth, this.selectedYear).subscribe(result => {
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
