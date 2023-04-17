import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeLeaveService } from '../employee-leave.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeLeaveRequest } from '../employee-leave-request.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { formatDate } from '@angular/common';

@Component({
  templateUrl: './employee-leave-request-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeLeaveRequestViewComponent implements OnInit {

  @Input() requestId: any;
  @Input() currentUserId: number;
  leaveRequest: EmployeeLeaveRequest;
  leaveComponent: any;
  dateChange: any;

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
      this.dateChange = formatDate(result.approvedDate, "dd-MM-yyyy", "en");
      if(this.dateChange=="01-01-0001"){
       this.dateChange='-'
      }else{
        this.dateChange = formatDate(result.approvedDate, "MMM d, yyyy", "en");
      }
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
