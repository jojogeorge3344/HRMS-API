import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { OvertimeRequestService } from '../overtime-request.service';
import { OvertimeRequestCreateComponent } from '../overtime-request-create/overtime-request-create.component';
import { OvertimeRequestEditComponent } from '../overtime-request-edit/overtime-request-edit.component';
import { OvertimeRequest } from '../overtime-request.model';
import { RequestStatus } from '../../../models/common/types/requeststatustype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { OvertimeRequestViewComponent } from '../overtime-request-view/overtime-request-view.component';

@Component({
  templateUrl: './overtime-request-list.component.html'
})
export class OvertimeRequestListComponent implements OnInit {

  overtimeRequests: OvertimeRequest[];
  overtimeRequestStatusTypes = RequestStatus;
  currentUserId: number;
  overtimePolicyId: number;

  constructor(
    private overtimeRequestService: OvertimeRequestService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getOvertimeRequests();
    this.getAssignedOverTimePolicyRequests();
  }

  isApplied(overtimeRequestStatus) {
    return overtimeRequestStatus == this.overtimeRequestStatusTypes.Applied;
  }

  getOvertimeRequests() {
    this.overtimeRequestService.getAllOvertimeDetailsById(this.currentUserId).subscribe((result: OvertimeRequest[]) => {
      this.overtimeRequests = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the overtime requests');
      });
  }

  getAssignedOverTimePolicyRequests() {
    this.overtimeRequestService.getAssignedOverTimePolicy(this.currentUserId).subscribe((result) => {
      this.overtimePolicyId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the overtime Policy Id');
      });
  }

  openAdd() {
    const modalRef = this.modalService.open(OvertimeRequestCreateComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.currentUserId = this.currentUserId;
    modalRef.componentInstance.policyId = this.overtimePolicyId;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimeRequests();
      }
    });
  }

  openEdit(overtimeRequest: OvertimeRequest) {
    const modalRef = this.modalService.open(OvertimeRequestEditComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.overtimeRequest = overtimeRequest;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimeRequests();
      }
    });
  }

  openView(overtimeRequest: OvertimeRequest) {
    const modalRef = this.modalService.open(OvertimeRequestViewComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.overtimeRequest = overtimeRequest;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimeRequests();
      }
    });
  }

  delete(overtimeRequest: OvertimeRequest) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the overtime request?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.overtimeRequestService.delete(overtimeRequest.id).subscribe(() => {
          this.toastr.showSuccessMessage('The overtime request is deleted successfully!');
          this.getOvertimeRequests();
        });
      }
    });
  }
}
