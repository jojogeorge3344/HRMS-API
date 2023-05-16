import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { getCurrentUserId } from "@shared/utils/utils.functions";
import { EmployeeLeaveService } from "../employee-leave.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./employee-leave-container.component.html",
})
export class EmployeeLeaveContainerComponent implements OnInit {
  leaveComponent: any;
  currentUserId: number;
  leaveSettings: any;
  canApplyLeave: boolean;
  isEmployeeLeave: boolean = false;
  date2: any;
  date1: any;

  constructor(
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private router: Router,
    private employeeLeaveService: EmployeeLeaveService
  ) {}

  ngOnInit(): void {
    debugger
    this.isEmployeeLeave = this.router.routerState.snapshot.url === "/leave";
    if (this.isEmployeeLeave) {
    } else {
    }
    this.currentUserId = getCurrentUserId();
    this.getLeaveBalance();
    this.getLeaveSettings();
  }

  getLeaveBalance() {
    this.employeeLeaveService.getAllLeaveBalance(this.currentUserId).subscribe(
      (result) => {
        this.leaveComponent = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Leave Balance");
      }
    );
  }

  getLeaveSettings() {
    this.employeeLeaveService.getAllLeaveSettings(this.currentUserId).subscribe(
      (result) => {
        this.leaveSettings = result[0];
        this.canApplyLeave = this.leaveCriteria();
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Leave Settings");
      }
    );
  }

  leaveCriteria() {
    this.date1 = new Date(this.leaveSettings.dateOfJoin);
    this.date2 = new Date();
    const diffTime = Math.abs(this.date2 - this.date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const yearsDiff = this.date2.getFullYear() - this.date1.getFullYear();
    if (this.leaveSettings.canEmployeeApplyLeave) {
      if (!this.leaveSettings.canApplyLeaveDuringProbation) {
        if (
          this.leaveSettings.periodType == 1 &&
          diffDays < this.leaveSettings.probationPeriod
        ) {
          return true;
        } else if (
          this.leaveSettings.periodType == 2 &&
          diffDays / 7 < this.leaveSettings.probationPeriod
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return false;
  }
}
