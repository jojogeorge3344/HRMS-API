import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { EmployeeBankDetailsService } from '../employee-bank-details.service';
import { EmployeeBankDetails } from '../employee-bank-details.model';

import { EmployeeBankDetailsCreateComponent } from '../employee-bank-details-create/employee-bank-details-create.component';
import { EmployeeBankDetailsEditComponent } from '../employee-bank-details-edit/employee-bank-details-edit.component';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-bank-details-actions',
  templateUrl: './employee-bank-details-actions.component.html'
})
export class EmployeeBankDetailsActionsComponent implements OnInit, OnDestroy {

  bankDetails: EmployeeBankDetails;
  currentUserId: number;
  isEmpty = true;

  @Output() getData = new EventEmitter<EmployeeBankDetails>();

  constructor(
    private bankService: EmployeeBankDetailsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) { }

  ngOnDestroy(): void {
     this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getBankDetails();
  }

  getBankDetails() {
    this.bankService.getall().subscribe(result => {
      if (result.length) {
        this.bankDetails = result[0];
        this.isEmpty = false;
        this.getData.emit(this.bankDetails);
      } else {
        this.getData.emit(null);
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the bank details');
    });
  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeeBankDetailsCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.result.then((result: string) => {
      if (result == 'submit') {
        this.getBankDetails();
      }
    });
  }

  openEdit(bankDetails) {
    const modalRef = this.modalService.open(EmployeeBankDetailsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.bankDetails = bankDetails;

    modalRef.result.then((result: string) => {
      if (result == 'submit') {
        this.getBankDetails();
      }
    });
  }

  delete(bankDetails) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete this bank account?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.bankService.delete(bankDetails.id).subscribe(() => {
          this.toastr.showSuccessMessage('The bank account deleted successfully!');
          this.isEmpty = true;
          this.getData.emit(null);
        },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('There is an error in deleting this bank account');
        });
      }
    });
  }

}
