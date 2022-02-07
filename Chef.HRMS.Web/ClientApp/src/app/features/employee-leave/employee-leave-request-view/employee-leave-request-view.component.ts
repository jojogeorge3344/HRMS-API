import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeLeaveService } from '../employee-leave.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeLeaveRequest } from '../employee-leave-request.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-leave-request-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeLeaveRequestViewComponent implements OnInit {

  @Input() requestId: any;
  @Input() currentUserId: number;
  leaveRequest: EmployeeLeaveRequest;
  leaveComponent: any;

  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    ) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getLeaveRequestByID();
    this.getLeaveBalance();

  }

  getLeaveRequestByID() {
    this.employeeLeaveService.get(this.requestId).subscribe(result => {
      this.leaveRequest = result;
      console.log(this.leaveRequest);
      
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Request');
      });
  }

  getLeaveBalance() {
    this.employeeLeaveService.getAllLeaveBalance(this.currentUserId).subscribe(result => {
      this.leaveComponent = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Leave Plans');
    });
  }

  getLeaveBalanceName(leaveComponentId) {
    if (this.leaveComponent) {
      return this.leaveComponent.find(key => key.leaveComponentId === leaveComponentId).leaveComponentName;
    }
    return null;
  }

  


}
