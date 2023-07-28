import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RequestStatus } from "../../../models/common/types/requeststatustype";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { EmployeeLeaveService } from "../employee-leave.service";
import { EmployeeLeaveRequest } from "../employee-leave-request.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeLeaveRequestViewComponent } from "../employee-leave-request-view/employee-leave-request-view.component";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";
import { EmployeeLeaveRequestCreateComponent } from "../employee-leave-request-create/employee-leave-request-create.component";
import { TeamAttendanceService } from "@features/team-attendance/team-attendance.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeeLeaveRequestEditComponent } from "../employee-leave-request-edit/employee-leave-request-edit.component";
import { formatDate } from "@angular/common";

@Component({
  selector: "hrms-employee-leave-request-list",
  templateUrl: "./employee-leave-request-list.component.html",
})
export class EmployeeLeaveRequestListComponent implements OnInit {
  currentUserId: number;
  leaveStatusKeys: number[];
  leaveStatus = RequestStatus;
  leave: any;
  leaveLogsOnDisplay: EmployeeLeaveRequest[] = [];

  leaveFilter = null;
  leaveStatusFilter = null;
  @Input() isEmployeeLeave: boolean;
  @Input() leaveComponent: any;
  @Input() leaveSettings: any;
  @Output() getBalance = new EventEmitter<string>();
  leavesApplied = [];
  wfhApplied = "";
  onDutyApplied = "";
  leaveInfo: EmployeeLeaveRequest[];
  searchleaveLogsOnDisplay: any;
  searchKey: any;

  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private teamAttendanceService: TeamAttendanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    debugger
    this.getLeaveBalance();
    this.currentUserId = getCurrentUserId();
    this.leaveStatusKeys = Object.keys(this.leaveStatus)
      .filter(Number)
      .map(Number);
    // this.getAllRequestedLeave();
    this.getMarkedDates("leave", this.currentUserId);
    this.getMarkedDates("onduty", this.currentUserId);
    this.getMarkedDates("workfromhome", this.currentUserId);
    if(this.isEmployeeLeave==false){
     this.getAllEmployeeDetailsLeave()
    }else{
      this.getAllRequestedLeave()
    }
  }

  getLeaveBalance() {
    this.getBalance.emit("getBalance");
  }

  getAllEmployeeDetailsLeave() {
    debugger
    this.employeeLeaveService.getAllLeaveDetails().subscribe(
      (result) => {
        this.leave = this.leaveLogsOnDisplay = result;
        this.searchleaveLogsOnDisplay=result
        console.log(this.leaveLogsOnDisplay);
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage(
          "Unable to fetch the Leave Request Details"
        );
      }
    );
  }
  getAllRequestedLeave() {
    this.employeeLeaveService.getAllByID(this.currentUserId).subscribe(
      (result) => {
        this.leave = this.leaveLogsOnDisplay = result;
        this.searchleaveLogsOnDisplay=result
        console.log(this.leaveLogsOnDisplay);
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage(
          "Unable to fetch the Leave Request Details"
        );
      }
    );
  }

  getMarkedDates(tablename, userId) {
    this.teamAttendanceService
      .getMarkedDates(tablename, userId)
      .subscribe((res) => {
        switch (tablename) {
          // case 'leave':
          //   this.leavesApplied = res;
          //   break;
          case "onduty":
            this.onDutyApplied = res;
            break;
          case "workfromhome":
            this.wfhApplied = res;
            break;
          default:
            break;
        }
      });
    this.employeeLeaveService
      .getAllInfoLeave(this.currentUserId)
      .subscribe((res) => {
        this.leavesApplied = res;
        //console.log("leaveinfo",this.leaveInfo);
      });
  }

  openView(leaveRequest: EmployeeLeaveRequest) {
    const modalRef = this.modalService.open(EmployeeLeaveRequestViewComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.leaveRequest = leaveRequest;
    modalRef.componentInstance.currentUserId = this.currentUserId;
    modalRef.result.then((result) => {
      if (result == "submit") {
        if(this.isEmployeeLeave==true){
          this.getAllRequestedLeave();
          }else{
            this.getAllEmployeeDetailsLeave()
          }
      }
    });
  }
  openPrint(leaveRequest: EmployeeLeaveRequest) {
    debugger
    this.router.navigate(["./print/" + leaveRequest.id ], {
      relativeTo: this.route.parent,
  })
    }
  openEdit(leaveRequest: EmployeeLeaveRequest) {
    const modalRef = this.modalService.open(
      EmployeeLeaveRequestEditComponent,
      { centered: true, backdrop: "static" }
    );
    modalRef.componentInstance.requestId = this.currentUserId;
    modalRef.componentInstance.leaveBalance = this.leaveComponent;
    modalRef.componentInstance.leaveSettings = this.leaveSettings;
    modalRef.componentInstance.leaves = this.leavesApplied;
    modalRef.componentInstance.wfh = this.wfhApplied;
    modalRef.componentInstance.onDuty = this.onDutyApplied;
    modalRef.componentInstance.isEmployeeLeave = this.isEmployeeLeave;
    modalRef.componentInstance.leaveRequest = leaveRequest;

    modalRef.result.then((result) => {
      if (result == "submit") {
        if(this.isEmployeeLeave==true){
          this.getAllRequestedLeave();
          this.getLeaveBalance();
          this.getMarkedDates("leave", this.currentUserId);
          }else{
            this.getAllEmployeeDetailsLeave()
          }
      }
    });
  }

  delete(request) {
    debugger
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to cancel the Leave Request ?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeLeaveService.delete(request.id).subscribe(() => {
          this.toastr.showSuccessMessage(
            "Leave Request Cancelled successfully"
          );
          if(this.isEmployeeLeave==true){
            this.getAllRequestedLeave();
            this.getLeaveBalance();
            this.getMarkedDates("leave", this.currentUserId);
            }
            else{
              this.getAllEmployeeDetailsLeave()
            }
        });
      }
    });
  }

  getLeaveBalanceName(leaveComponentId) {
    if (this.leaveComponent.length) {
      return this.leaveComponent.find(
        (key) => key.leaveComponentId === leaveComponentId
      )
        ? this.leaveComponent.find(
            (key) => key.leaveComponentId === leaveComponentId
          ).leaveComponentName
        : "";
    }
    return null;
  }

  openRequestLeave() {
    const modalRef = this.modalService.open(
      EmployeeLeaveRequestCreateComponent,
      { centered: true, backdrop: "static" }
    );
    modalRef.componentInstance.requestId = this.currentUserId;
    modalRef.componentInstance.leaveBalance = this.leaveComponent;
    modalRef.componentInstance.leaveSettings = this.leaveSettings;
    modalRef.componentInstance.leaves = this.leavesApplied;
    modalRef.componentInstance.wfh = this.wfhApplied;
    modalRef.componentInstance.onDuty = this.onDutyApplied;
    modalRef.componentInstance.isEmployeeLeave = this.isEmployeeLeave;

    modalRef.result.then((result) => {
      if (result == "submit") {
        if(this.isEmployeeLeave==true){
          this.getAllRequestedLeave();
          this.getLeaveBalance();
          this.getMarkedDates("leave", this.currentUserId);
          }else{
            this.getAllEmployeeDetailsLeave()
          }
       
      }
    });
  }

  filterHistory() {
    if (!this.leaveFilter && !this.leaveStatusFilter) {
      this.leaveLogsOnDisplay = this.leave;
      return;
    }

    this.leaveLogsOnDisplay = this.leave.filter((element) => {
      return (
        (!this.leaveFilter ||
          this.leaveFilter == "null" ||
          element.leaveComponentId == this.leaveFilter) &&
        (!this.leaveStatusFilter ||
          this.leaveStatusFilter == "null" ||
          element.leaveStatus == this.leaveStatusFilter)
      );
    });
  }
  isApplied(request) {
    return request == this.leaveStatus.Draft;
  }
  searchLeave(): void {
    debugger
    this.leaveLogsOnDisplay = this.searchleaveLogsOnDisplay.filter(
      (x) =>
        x.employeeName?.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        x.description?.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        (this.leaveStatus[x.leaveStatus]).toLowerCase().includes(this.searchKey.toLowerCase())||
        this.getLeaveBalanceName(x.leaveComponentId)?.toLowerCase().includes(this.searchKey.toLowerCase())||
        (formatDate(x.fromDate, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        (formatDate(x.createdDate, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        x.createdBy?.toLowerCase().includes(this.searchKey.toLowerCase())
    );
  }
} 
