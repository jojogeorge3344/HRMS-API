import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayrollProcessLeaveService } from '../payroll-process-leave.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { Months } from 'src/app/models/common/types/months';
import { ApprovedLeaveComponent } from '../approved-leave/approved-leave.component';
import { UnApprovedLeaveComponent } from '../un-approved-leave/un-approved-leave.component';
import { PayrollLeaveAndAttandanceViewModel } from '../payroll-process-leave-attendance-view.model';
import { UnMarkedLeaveComponent } from '../un-marked-leave/un-marked-leave.component';
import { PayrollProcessService } from '../../payroll-process.service';
import { getCurrentUserId, getNoOfWeekoffsInMonth } from '@shared/utils/utils.functions';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeService } from '@features/employee/employee.service';
import { SendEmailService } from '@features/payroll-process/send-email.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'hrms-payroll-process-leave-list',
  templateUrl: './payroll-process-leave-list.component.html'
})
export class PayrollProcessLeaveListComponent implements OnInit {
  currentUser: number;
  @Output() selectTab = new EventEmitter<number>();

  months = Months;
  month = Months;
  previousMonths = [];
  currentDate = new Date();
  selectedMonth: any;
  selectedYear: any;
  noOfCalendarDays: number;
  paygroupId: any;
  id: any;
  payGroupProcessLeave: PayrollLeaveAndAttandanceViewModel[] = [];
  fromDate: string;
  toDate: string;
  employeeId: number;
  payrollmonth:any
  payrollyear:any
  payrollcutoff:any
  payrollProcessId:any
  leaveDetails_insert:any=[]

  constructor(
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService,
    private employeeService: EmployeeService,
    private sendEmailService: SendEmailService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private payrollProcessLeaveService: PayrollProcessLeaveService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      this.selectedYear = parseInt(params.date.split('-')[1], 10);
      this.selectedMonth = parseInt(this.months[params.date.split('-')[0]], 10);
      this.month = params.date.split('-')[0];
      this.noOfCalendarDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
      this.payrollmonth =  params.month
      this.payrollyear =params.year
      this.payrollcutoff = params.cutOffDay
      this.payrollProcessId = params.processId
    });
    this.getAllLeaveAttendancePayGroup();
  }

  // getAllLeaveAttendancePayGroup() {

    
  //   this.payrollProcessLeaveService.getAll(this.paygroupId, `${this.selectedYear}-${this.selectedMonth}-01`, `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`)
  //     .subscribe(result => {
  //       const noOfWeekOffs = getNoOfWeekoffsInMonth(this.selectedMonth, this.selectedYear, [0, 6]);
  //       this.payGroupProcessLeave = result.map(employeeAttendance => {
  //         return {
  //           ...employeeAttendance,
  //           numberOfWorkingDays: this.noOfCalendarDays - (noOfWeekOffs + employeeAttendance.numberOfHolidays),
  //           unmarkedAttendance: this.noOfCalendarDays - (noOfWeekOffs + employeeAttendance.numberOfHolidays) -
  //             (employeeAttendance.numberOfWorkedDays + employeeAttendance.leaveApplied)
  //         };
  //       });

  //     },
  //       error => {
  //         console.error(error);
  //         this.toastr.showErrorMessage('Unable to fetch the All Leave and Attendance PayGroup');
  //       });
  // }


  getAllLeaveAttendancePayGroup() {


    var month = parseInt(this.payrollmonth)
    var year = parseInt(this.payrollyear)
    var day = parseInt(this.payrollcutoff)
    var todate = new Date(year,month-1, day)
    var previous = new Date(todate.getTime());
    previous.setMonth(previous.getMonth() - 1);

    
    this.payrollProcessLeaveService.getAll(this.paygroupId, this.datePipe.transform(previous,"yyyy-MM-dd"), this.datePipe.transform(todate,"yyyy-MM-dd"),parseInt(this.payrollProcessId))
      .subscribe(result => {
        this.payGroupProcessLeave = result
        const noOfWeekOffs = getNoOfWeekoffsInMonth(this.selectedMonth, this.selectedYear, [0, 6]);
        // this.payGroupProcessLeave = result.map(employeeAttendance => {
        //   return {
        //     ...employeeAttendance,
        //     numberOfWorkingDays: this.noOfCalendarDays - (noOfWeekOffs + employeeAttendance.numberOfHolidays),
        //     unmarkedAttendance: this.noOfCalendarDays - (noOfWeekOffs + employeeAttendance.numberOfHolidays) -
        //       (employeeAttendance.numberOfWorkedDays + employeeAttendance.leaveApplied)
        //   };
        // });

      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to fetch the All Leave and Attendance PayGroup');
        });
  }

  openApprovedLeave(employeeId, employeeName) {
    this.fromDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.toDate = `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`;
    const modalRef = this.modalService.open(ApprovedLeaveComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = employeeId;
    modalRef.componentInstance.employeeName = employeeName;
    modalRef.componentInstance.fromDate = this.fromDate;
    modalRef.componentInstance.toDate = this.toDate;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLeaveAttendancePayGroup();
      }
    });
  }

  openUnApprovedLeave(employeeId, employeeName) {
    this.fromDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.toDate = `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`;
    const modalRef = this.modalService.open(UnApprovedLeaveComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = employeeId;
    modalRef.componentInstance.employeeName = employeeName;
    modalRef.componentInstance.fromDate = this.fromDate;
    modalRef.componentInstance.toDate = this.toDate;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLeaveAttendancePayGroup();
      }
    });
  }

  openUnmarkedLeave(employeeId, employeeName) {
    this.fromDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.toDate = `${this.selectedYear}-${this.selectedMonth}-${this.noOfCalendarDays}`;
    const modalRef = this.modalService.open(UnMarkedLeaveComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = employeeId;
    modalRef.componentInstance.employeeName = employeeName;
    modalRef.componentInstance.fromDate = this.fromDate;
    modalRef.componentInstance.toDate = this.toDate;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLeaveAttendancePayGroup();
      }
    });
  }

  openRevertToEmployee(leaveAttendancePaygroup) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Please confirm if you want to revert to employee for attendance submission?`;
    modalRef.result.then((userResponse) => {
      if (userResponse === true) {
        this.employeeService.getDetails(leaveAttendancePaygroup.employeeId).subscribe(res => {
          const name = `${res.firstName} ${res.middleName || ''} ${res.lastName}`.replace(/ +(?= )/g, '');
          const employeeEmail = {
            department: res.department.toString(),
            email: res.email,
            employeeName: name,
            month: this.months[this.selectedMonth],
          };
          this.sendEmailService.revertToEmployee(employeeEmail).subscribe(() => {
            this.toastr.showInfoMessage(`Leave Details Reverted To ${name}`);
          }, error => {
            if (error.error && error.error.text === 'Email send successfully.') {
              this.toastr.showInfoMessage(`Leave Details Reverted To ${name}`);
            }
          });
        });
      }
    });

  }

  // onSubmit(routeTo) {
  //   debugger
  //   this.currentUser = getCurrentUserId();
  //   const payrollLeaveProcess = this.payGroupProcessLeave.map((component) => {
  //     return {
  //       payrollProcessingMethodId: this.id,
  //       employeeId: component.employeeId,
  //       payGroupId: this.paygroupId,
  //       employeeCode: component.employeeCode,
  //       employeeName: component.employeeName,
  //       numberOfWorkingDays: component.numberOfWorkingDays,
  //       numberOfWorkedDays: component.numberOfWorkedDays,
  //       lop: component.lop,
  //       leaveApplied: component.leaveApplied,
  //       approvedLeaves: component.approvedLeaves,
  //       unapprovedLeaves: component.unapprovedLeaves,
  //       unmarkedAttendance: component.unmarkedAttendance,
  //       payrollProcessingStatus: 2
  //     };
  //   });

  //   if (this.payGroupProcessLeave.reduce((sum, x) => sum + x.unmarkedAttendance, 0) !== 0
  //     || this.payGroupProcessLeave.reduce((sum, x) => sum + x.unapprovedLeaves, 0) !== 0) {
  //     this.toastr.showErrorMessage('Kindly mark all your unmarked attendance');
  //     return;
  //   } else {
  //     this.payrollProcessLeaveService.add(payrollLeaveProcess).subscribe(res => {
  //       if (res) {
  //         this.payrollProcessService.updateProcessedStep(this.id, 1, { id: this.id, stepNumber: 1 })
  //           .subscribe(() => {
  //             this.toastr.showSuccessMessage('Payroll Leave and Attendance Processing Completed');
  //             if (routeTo === 'continue') {
  //               this.selectTab.emit(2);
  //             } else {
  //               this.router.navigate(['../'], { relativeTo: this.route });
  //             }
  //           });
  //       }
  //     });
  //   }
  // }

  onSubmit(routeTo) {
    this.currentUser = getCurrentUserId();

    if (this.payGroupProcessLeave.reduce((sum, x) => sum + x.unmarkedAttendance, 0) !== 0
    || this.payGroupProcessLeave.reduce((sum, x) => sum + x.unapprovedLeaves, 0) !== 0) {
    this.toastr.showErrorMessage('Kindly mark all your unmarked attendance');
    return;
  } else {

    for(let i=0;i< this.payGroupProcessLeave.length;i++){
      this.payGroupProcessLeave[i].payrollProcessDate = new Date()
      this.payGroupProcessLeave[i].payrollProcessingMethodId = parseInt(this.payrollProcessId)
      this.payGroupProcessLeave[i].payGroupId = parseInt(this.paygroupId)
      this.payGroupProcessLeave[i].status = 1
    }
    this.payrollProcessLeaveService.add(this.payGroupProcessLeave).subscribe(res => {
      this.insertLeaveDetails();
     
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to Insert Leave Details.');
    });
  }
  }


  insertLeaveDetails(){
    for(let i=0;i<this.payGroupProcessLeave.length;i++){
      this.leaveDetails_insert.push({id: this.payGroupProcessLeave[i].id,
      createdDate:this.payGroupProcessLeave[i].createdDate,
      modifiedDate: this.payGroupProcessLeave[i].modifiedDate,
      createdBy: this.payGroupProcessLeave[i].createdBy,
      modifiedBy: this.payGroupProcessLeave[i].modifiedBy,
      isArchived: true,
      payrollProcessId: parseInt(this.payrollProcessId),
      payrollProcessDate: new Date(),
      employeeId: this.payGroupProcessLeave[i].employeeId,
      leaveId: this.payGroupProcessLeave[i].leaveId,
      totalNumOfWorkDays: this.payGroupProcessLeave[i].numberOfWorkedDays,
      totalNumOfWorkingDays: this.payGroupProcessLeave[i].numberOfWorkingDays,
      approvedLeave: this.payGroupProcessLeave[i].approvedLeaves,
      unApprovedLeave: this.payGroupProcessLeave[i].unapprovedLeaves,
      unMarkedAttendance: this.payGroupProcessLeave[i].unmarkedAttendance,
      lopDays: this.payGroupProcessLeave[i].lop,
      processStatus: 0})

    }
   
    this.payrollProcessLeaveService.InsertPayrollLeaveDetails(this.leaveDetails_insert).subscribe(res => {
    
        this.payrollProcessService.updateProcessedStep(this.id, 1, { id: this.id, stepNumber: 1 })
          .subscribe(() => {
            this.toastr.showSuccessMessage('Payroll Leave and Attendance Processing Completed');
          });
      
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to Insert Leave Details.');
    });
  }

}
