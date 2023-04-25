import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from '../loan-request.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { LoanRequestEditComponent } from '../loan-request-edit/loan-request-edit.component';
import { LoanRequestCreateComponent } from '../loan-request-create/loan-request-create.component';
import { LoanType } from '../../../models/common/types/loantype';
import { PaymentType } from '../../../models/common/types/paymenttype';
import { LoanRequest } from '../loan-request.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { LoanRequestViewComponent } from '../loan-request-view/loan-request-view.component';

@Component({
  templateUrl: './loan-request-list.component.html'
})
export class LoanRequestListComponent implements OnInit {

  public loanRequests: any = [];

  loanTypes = LoanType;
  paymentTypes = PaymentType;
  minDate;
  nextLoanNumber: number;

  constructor(
    http: HttpClient,
    private loanRequestService: LoanRequestService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
    ) {
      const current = new Date();
      this.minDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate()
      };
     }

  ngOnInit(): void {
    this.getloanRequests();
  }

  getloanRequests() {
    this.loanRequestService.getLoanId().subscribe(res => {
      this.nextLoanNumber = res;
    });
    this.loanRequestService.getAll().subscribe(result => {
      this.loanRequests = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the loan requests');
      });
  }

  openCreateLoanRequest() {
    const modalRef = this.modalService.open(LoanRequestCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.nextLoanNumber = this.nextLoanNumber;
   
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getloanRequests();
      }
    });
  }

  openEditLoanRequest(id: number,isApproved:boolean) {
    const modalRef = this.modalService.open(LoanRequestEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.loanId = id;
    modalRef.componentInstance.isApproved = isApproved
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getloanRequests();
        }
    });
  }
  openViewLoanRequest(id: number) {
    const modalRef = this.modalService.open(LoanRequestViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.loanId = id;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getloanRequests();
        }
    });
  }

  isDisabled(request) {
   if(request.isApproved == true){
     return true;
   }  
  }
  deleteLoanRequest(loanRequest: LoanRequest) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to cancel the Loan Request ${loanRequest.loanNo}?`;
    modalRef.result.then((userResponse) => {
        if (userResponse == true) {
          this.loanRequestService.delete(loanRequest.id).subscribe(() => {
            this.toastr.showSuccessMessage('The Loan Request cancelled successfully!');
            this.getloanRequests();
          });
        }
    });
  }
}
