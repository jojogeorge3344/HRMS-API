import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollProcessLeaveService } from '../payroll-process-leave/payroll-process-leave.service';
import { PayrollLeaveAndAttandanceViewModel } from '../payroll-process-leave/payroll-process-leave-attendance-view.model';
import { ApprovedLeaveComponent } from '../payroll-process-leave/approved-leave/approved-leave.component';
import { UnApprovedLeaveComponent } from '../payroll-process-leave/un-approved-leave/un-approved-leave.component';
import { UnMarkedLeaveComponent } from '../payroll-process-leave/un-marked-leave/un-marked-leave.component';
import { Months } from 'src/app/models/common/types/months';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollProcessService } from '../payroll-process.service';
import { Employee } from '@features/employee/employee.model';
import { SendEmailService } from '../send-email.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-employee-leave',
  templateUrl: './payroll-employee-leave.component.html'
})
export class PayrollEmployeeLeaveComponent implements OnInit {
  @Output() selectTab = new EventEmitter<number>();
  @Input() employee: Employee;
  id: number;
  employeeId: number;
  months = Months;
  payrollProcess: PayrollLeaveAndAttandanceViewModel;
  selectedYear: any;
  selectedMonth: any;
  noOfCalendarDays: number;
  fromDate: string;
  toDate: string;

  constructor(
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService,
    private sendEmailService: SendEmailService,
    private toastr: ToasterDisplayService,
    private router: Router,
    public modalService: NgbModal,
    private payrollProcessLeaveService: PayrollProcessLeaveService) {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.noOfCalendarDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);

    });
  }

  ngOnInit(): void {
    this.getPayrollProcess();
  }
  getPayrollProcess() {
    this.payrollProcessService.get(this.id).subscribe(payrollProcess => {
      if (payrollProcess.processedStep >= 1) {
        this.payrollProcessLeaveService.getByEmployee(this.employeeId, this.id)
          .subscribe(res => {
            this.payrollProcess = res;
          });
      } else {
        this.payrollProcessLeaveService.getByEmployeeLeaves(this.employeeId, `${this.selectedYear}-${this.selectedMonth}-01`, `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`)
          .subscribe(res => {

            this.payrollProcess = {
              employeeId: 0,
              employeeCode: '',
              employeeName: '',
              numberOfWorkingDays: res.totalworkingdays - res.holidaycount,
              numberOfHolidays: res.holidaycount,
              numberOfWorkedDays: res.workeddays,
              leaveApplied: res.appliedleave,
              lop: res.lop,
              approvedLeaves: res.approvedleave,
              unapprovedLeaves: res.UnApprovedleave,
              unmarkedAttendance: (res.totalworkingdays - res.holidaycount) - (res.appliedleave + res.workeddays),
            };
          });

      }
    });
  }
  openApprovedLeave() {
    this.fromDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.toDate = `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`;
    const modalRef = this.modalService.open(ApprovedLeaveComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.employee.id;
    modalRef.componentInstance.employeeName = `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`;
    modalRef.componentInstance.fromDate = this.fromDate;
    modalRef.componentInstance.toDate = this.toDate;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayrollProcess();
      }
    }, error => {
      console.log(error);
    });
  }

  openUnApprovedLeave() {
    this.fromDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.toDate = `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`;
    const modalRef = this.modalService.open(UnApprovedLeaveComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.employee.id;
    modalRef.componentInstance.employeeName = `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`;
    modalRef.componentInstance.fromDate = this.fromDate;
    modalRef.componentInstance.toDate = this.toDate;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayrollProcess();
      }
    }, error => {
      console.log(error);
    });
  }

  openUnmarkedLeave() {
    this.fromDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.toDate = `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`;
    const modalRef = this.modalService.open(UnMarkedLeaveComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.employee.id;
    modalRef.componentInstance.employeeName = `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`;
    modalRef.componentInstance.fromDate = this.fromDate;
    modalRef.componentInstance.toDate = this.toDate;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayrollProcess();
      }
    }, error => {
      console.log(error);
    });
  }

  openRevertToEmployee() {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Please confirm if you want to revert to employee for attendance submission?`;
    modalRef.result.then((userResponse) => {
      if (userResponse === true) {
        const name = `${this.employee.firstName} ${this.employee.middleName || ''} ${this.employee.lastName}`.replace(/ +(?= )/g, '')
        const employeeEmail = {
          department: this.employee.department.toString(),
          email: this.employee.email,
          employeeName: name,
          month: this.months[this.selectedMonth],
        };
        this.sendEmailService.revertToEmployee(employeeEmail).subscribe(res => {
          this.toastr.showInfoMessage(`Leave Details Reverted To ${name}`);
        }, error => {
          if (error.error && error.error.text === 'Email send successfully.') {
            this.toastr.showInfoMessage(`Leave Details Reverted To ${name}`);
          }
        });
      }
    });
  }

  onSubmit(routeTo) {
    const payrollLeave = [{
      payrollProcessingMethodId: this.id,
      employeeId: this.employee.id,
      employeeCode: this.employee.employeeNumber,
      employeeName: `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`,
      numberOfWorkingDays: this.payrollProcess.numberOfWorkingDays,
      numberOfWorkedDays: this.payrollProcess.numberOfWorkedDays,
      leaveApplied: this.payrollProcess.leaveApplied,
      lop: this.payrollProcess.lop,
      approvedLeaves: this.payrollProcess.approvedLeaves,
      unapprovedLeaves: this.payrollProcess.unapprovedLeaves,
      unmarkedAttendance: this.payrollProcess.unmarkedAttendance,
      payrollProcessingStatus: 2,
    }];
    if (payrollLeave[0].unmarkedAttendance !== 0 || payrollLeave[0].unapprovedLeaves !== 0) {
      this.toastr.showErrorMessage('Kindly mark all your unmarked attendance');
      return;
    } else {
      this.payrollProcessLeaveService.add(payrollLeave).subscribe(res => {
        this.gotoNextStep(routeTo);
      });

    }

  }
  gotoNextStep(routeTo) {
    this.payrollProcessService.updateProcessedStep(this.id, 1, { id: this.id, stepNumber: 1 })
      .subscribe(res => {
        this.toastr.showSuccessMessage('Payroll Leave Processing Completed');
        if (routeTo === 'continue') {
          this.selectTab.emit(2);
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }
}
