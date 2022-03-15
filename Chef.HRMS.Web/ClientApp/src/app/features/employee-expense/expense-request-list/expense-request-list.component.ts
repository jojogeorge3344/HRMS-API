import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ExpenseRequestService } from '../expense-request.service';
import { ExpenseRequestCreateComponent } from '../expense-request-create/expense-request-create.component';
import { ExpenseRequestEditComponent } from '../expense-request-edit/expense-request-edit.component';
import { ExpenseRequest } from '../expense-request.model';
import { ExpenseRequestViewComponent } from '../expense-request-view/expense-request-view.component';
import { RequestStatus } from '../../../models/common/types/requeststatustype';
import { ExpenseConfigurationService } from '@settings/expense/expense-configuration/expense-configuration.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ExpenseConfiguration } from '@settings/expense/expense-configuration/expense-configuration.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-request-list',
  templateUrl: './expense-request-list.component.html'
})
export class ExpenseRequestListComponent implements OnInit {

  expenseRequests: ExpenseRequest[];
  expenseRequestStatusTypes = RequestStatus;
  expenseTypes: ExpenseConfiguration[];
  currentUserId: number;
  expenseRequestNames: string[];

  constructor(
    private expenseRequestService: ExpenseRequestService,
    private expenseConfigurationService: ExpenseConfigurationService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getExpenseTypes();
  }

  isApplied(expenseRequestStatus) {
    return expenseRequestStatus == this.expenseRequestStatusTypes.Applied;
  }

  getExpenseRequests() {
    this.expenseRequestService.getAllExpenseDetailsById(this.currentUserId).subscribe((result: ExpenseRequest[]) => {
      this.expenseRequests = result;
      console.log(result);
      
      this.expenseRequestNames = this.expenseRequests.map(a => a.name.toLowerCase());
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense requests');
      });
  }

  getExpenseTypes() {
    this.expenseConfigurationService.getExpenseTypes(this.currentUserId).subscribe((result: any) => {
      this.expenseTypes = result;
      if (this.expenseTypes.length > 0) {

        this.getExpenseRequests();
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense requests');
      });
  }

  getCurrentExpenseType(expenseConfigurationId) {
    return this.expenseTypes.find(item => item.id == expenseConfigurationId);
  }

  openCreate() {
    console.log(this.expenseTypes);
    const modalRef = this.modalService.open(ExpenseRequestCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.expenseTypes = this.expenseTypes;
    modalRef.componentInstance.expenseRequestNames = this.expenseRequestNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getExpenseRequests();
      }
    });
  }

  openEdit(expenseRequest: ExpenseRequest) {
    const modalRef = this.modalService.open(ExpenseRequestEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.expenseRequest = expenseRequest;
    modalRef.componentInstance.expenseConfigurationId = expenseRequest.expenseConfigurationId;
    modalRef.componentInstance.expenseRequestNames = this.expenseRequestNames.filter(v => v !== expenseRequest.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getExpenseRequests();
      }
    });
  }

  openView(expenseRequest: ExpenseRequest) {
    const modalRef = this.modalService.open(ExpenseRequestViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.expenseRequest = expenseRequest;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getExpenseRequests();
      }
    });
  }

  delete(expenseRequest: ExpenseRequest) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the expense request ${expenseRequest.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.expenseRequestService.delete(expenseRequest.id).subscribe(() => {
          this.toastr.showSuccessMessage('The expense request is deleted successfully!');
          this.getExpenseRequests();
        });
      }
    });
  }
}
