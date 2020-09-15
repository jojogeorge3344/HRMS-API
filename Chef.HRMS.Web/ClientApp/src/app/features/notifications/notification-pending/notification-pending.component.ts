import { Component, OnInit } from '@angular/core';
import { EmployeeLeaveService } from '@features/employee-leave/employee-leave.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { LeaveRequestViewComponent } from '../leave-request-view/leave-request-view.component';
import { LeaveComponentService } from '@settings/leave/leave-component/leave-component.service';
import { LeaveComponent } from '@settings/leave/leave-component/leave-component.model';
import { EmployeeService } from '@features/employee/employee.service';


@Component({
  selector: 'hrms-notification-pending',
  templateUrl: './notification-pending.component.html',
  styles: [
  ]
})
export class NotificationPendingComponent implements OnInit {
  notifications = [];
  currentUserId: number;
  leaveComponents: LeaveComponent[];
  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    private leaveComponentService: LeaveComponentService,
    private employeeService: EmployeeService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getLeaveNotifications();
    this.getLeaveComponents();
  }
  getLeaveComponents() {
    this.leaveComponentService.getAll().subscribe(res => {
      this.leaveComponents = res;
    });
  }
  getLeaveNotifications() {
    forkJoin([
      this.employeeLeaveService.getunapprovedLeaves(this.currentUserId),
      this.employeeService.getAll()
    ])
      .subscribe(([leaveRequests, employees]) => {
        leaveRequests.map(leaveRequest => {
          leaveRequest.employee = employees.find(employee => employee.id === leaveRequest.employeeId);
        });
        this.notifications = leaveRequests;
      });
  }
  approve(notification) {
    const approvedNotification = {
      ...notification,
      leaveStatus: 3,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    this.employeeLeaveService.update(approvedNotification).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Leave Request Approved successfully');
        this.getLeaveNotifications();
      }
    });

  }
  reject(notification) {
    const approvedNotification = {
      ...notification,
      leaveStatus: 5,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    this.employeeLeaveService.update(approvedNotification).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Leave Request Rejected successfully');
        this.getLeaveNotifications();
      }
    });

  }
  openLeave(notification) {
    const modalRef = this.modalService.open(LeaveRequestViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.notification = notification;
    modalRef.componentInstance.leaveComponents = this.leaveComponents;
    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getLeaveNotifications();
      }
    }, () => { });
  }

}
