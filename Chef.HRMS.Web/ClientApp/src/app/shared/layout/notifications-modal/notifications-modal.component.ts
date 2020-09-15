
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { forkJoin } from 'rxjs';

import { NotificationsModalService } from './notifications-modal.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Notifications } from './notifications-model';
import { SignalrService } from '@shared/services/signalr.service';
import { EmployeeLeaveService } from '@features/employee-leave/employee-leave.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
@Component({
  selector: 'hrms-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class NotificationsModalComponent implements OnInit {
  notificationCount = 0;
  notificationList: Notifications[] = [];
  currentUserId: number;

  constructor(
    private notificationsModalService: NotificationsModalService,
    private toastr: ToasterDisplayService,
    private employeeLeaveService: EmployeeLeaveService,
    private signalrService: SignalrService) {
  }
  ngOnInit() {
    this.currentUserId = getCurrentUserId();
    this.notificationsModalService.GetAllNotificationById(this.currentUserId).subscribe(result => {
      this.notificationList = result;
      if (this.notificationList.length !== 0) {
        let sum = 0;
        this.notificationList.forEach(element => {
          sum += element.pendingRequest;
        });
        this.notificationCount = sum;
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the notifications');
      });
    this.recievesignalR();
  }
  recievesignalR() {
    this.signalrService.startConnection();
    this.signalrService.recieveFromConnection().on('LeaveNotification', (data) => {
      if (data) {
        forkJoin([this.employeeLeaveService.getApproverById(data), this.employeeLeaveService.getAllNotifyPersonnals(data)])
          .subscribe((res) => {
            const notifyPersonals = [
              ...res[0].map(approver => (approver.reportingManager)),
              ...res[1].map(approver => (approver.notifyPersonnel))
            ];
            if (notifyPersonals.indexOf(this.currentUserId) !== -1) {
              this.notificationList = [

                {
                  pendingRequest: 1,
                  employeeId: 0,
                  notificationType: 'Leave'
                },
                ...this.notificationList
              ];
              this.notificationCount = this.notificationCount + 1;
            }
          });
      }
    });
  }





}
