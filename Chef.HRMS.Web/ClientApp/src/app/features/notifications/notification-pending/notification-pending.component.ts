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
import { ExpenseRequestService } from '@features/employee-expense/expense-request.service';
import { ExpenseRequestViewComponent } from '../expense-request-view/expense-request-view.component';


@Component({
  selector: 'hrms-notification-pending',
  templateUrl: './notification-pending.component.html',
  styles: [
  ]
})
export class NotificationPendingComponent implements OnInit {
  notifications: any[] = [];
  currentUserId: number;
  leaveComponents: LeaveComponent[];
  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    private leaveComponentService: LeaveComponentService,
    private expenseRequestService: ExpenseRequestService,
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
      this.expenseRequestService.getUnapprovedExpense(this.currentUserId),
      this.employeeService.getAll()
    ])
      .subscribe(([leaveRequests, expenseRequests, employees]) => {
        leaveRequests.map(leaveRequest => {
          leaveRequest.employee = employees.find(employee => employee.id === leaveRequest.employeeId);
          leaveRequest.type = 'Leave';
        });
        expenseRequests.map(expenseRequest => {
          expenseRequest.employee = employees.find(employee => employee.id === expenseRequest.employeeId);
          expenseRequest.type = 'Expense';
        });
        this.notifications = [...leaveRequests, ...expenseRequests];
      });
  }
  approve(notification) {
    const modifiedNotification = {
      ...notification,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };

    if (modifiedNotification.type === 'Leave') {
      this.approveLeave(modifiedNotification);
    }
    if (modifiedNotification.type === 'Expense') {
      this.approveLeave(modifiedNotification);
    }

  }
  approveLeave(notification) {
    const approvedNotification = {
      ...notification,
      leaveStatus: 3,
    };
    this.employeeLeaveService.update(approvedNotification).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Leave Request Approved successfully');
        this.getLeaveNotifications();
      }
    });
  }
  approveExpense(notification) {
    const approvedNotification = {
      ...notification,
      requestStatus: 3,
    };
    this.expenseRequestService.update(approvedNotification).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Expense Request Approved successfully');
        this.getLeaveNotifications();
      }
    });
  }
  rejectLeave(notification) {
    const approvedNotification = {
      ...notification,
      leaveStatus: 5,
    };
    this.employeeLeaveService.update(approvedNotification).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Leave Request Rejected successfully');
        this.getLeaveNotifications();
      }
    });
  }
  rejectExpense(notification) {
    const approvedNotification = {
      ...notification,
      requestStatus: 5,
    };
    this.employeeLeaveService.update(approvedNotification).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Leave Request Rejected successfully');
        this.getLeaveNotifications();
      }
    });
  }
  reject(notification) {
    notification = {
      ...notification,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    if (notification.type === 'Leave') {
      this.rejectLeave(notification);
    }
    if (notification.type === 'Expense') {
      this.rejectExpense(notification);
    }

  }
  openView(notification){
    if (notification.type === 'Leave') {
      this.openLeave(notification);
    }
    if (notification.type === 'Expense') {
      this.openExpense(notification);
    }
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
  openExpense(notification) {
    const modalRef = this.modalService.open(ExpenseRequestViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.expenseRequest = notification;
    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getLeaveNotifications();
      }
    }, () => { });
  }

}
