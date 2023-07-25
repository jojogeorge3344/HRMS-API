import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeLeaveService } from "../employee-leave.service";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from "@ng-bootstrap/ng-bootstrap";
import { EmployeeLeaveRequest } from "../employee-leave-request.model";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { formatDate } from "@angular/common";

@Component({
  templateUrl: "./employee-leave-request-view.component.html",
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class EmployeeLeaveRequestViewComponent implements OnInit {
  @Input() currentUserId: number;
  @Input() leaveRequest: EmployeeLeaveRequest;
  leaveComponentName: string;
  fromDate: string;
  toDate: string;
  rejoinDate: string;

  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService
  ) {}

  ngOnInit(): void {
    this.getLeaveRequestDetails();
  }

  getLeaveRequestDetails() {
    this.fromDate = formatDate(this.leaveRequest.fromDate, "dd-MM-yyyy", "en");
    this.toDate = formatDate(this.leaveRequest.toDate, "dd-MM-yyyy", "en");
    this.rejoinDate = formatDate(
      this.leaveRequest.rejoinDate,
      "dd-MM-yyyy",
      "en"
    );

    this.employeeLeaveService.getAllLeaveBalance(this.leaveRequest.employeeId).subscribe(
      (leaveComponents) => {
        this.leaveComponentName = leaveComponents.find(
          (key) => key.leaveComponentId === this.leaveRequest.leaveComponentId
        )?.leaveComponentName;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Leave Plans");
      }
    );
  }
}
