import { Component, OnInit } from '@angular/core';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessService } from '../payroll-process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { timeStamp } from 'console';

@Component({
  selector: 'hrms-payroll-process-overtime-list',
  templateUrl: './payroll-process-overtime-list.component.html',
  styleUrls: ['./payroll-process-overtime-list.component.scss']
})
export class PayrollProcessOvertimeListComponent implements OnInit {
  payrollmonth:any
  payrollyear:any
  payrollcutoff:any
  id:any
  paygroupId:any
  month:any
  overTimeDetails:any=[]
  overTimeCutOff:any
  payrollProcessId:any
  overTimeDetails_save:any=[]
  constructor(
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params.id, 10);
      this.payrollmonth =  params.month
      this.payrollyear =params.year
      this.payrollcutoff = params.cutOffDay
      this.paygroupId = parseInt(params.payGroup, 10);
      this.month = params.date.split('-')[0];
      this.overTimeCutOff = params.overTimeCutOff
      this.payrollProcessId = params.processId
    });
    this.getAllLeaveAttendancePayGroup()
    
  }

  onSubmit(){

    debugger
    for(let i=0;i<this.overTimeDetails.length;i++){
          // this.overTimeDetails[i].id =  this.overTimeDetails[i].id
          // this.overTimeDetails[i].createdDate =  this.overTimeDetails[i].createdDate
          // this.overTimeDetails[i].modifiedDate =  this.overTimeDetails[i].modifiedDate
          // this.overTimeDetails[i].createdBy =  this.overTimeDetails[i].createdBy
          // this.overTimeDetails[i].modifiedBy =  this.overTimeDetails[i].modifiedBy
          // this.overTimeDetails[i].isArchived =  this.overTimeDetails[i].isArchived
          this.overTimeDetails[i].payrollProcessId =  this.payrollProcessId
          this.overTimeDetails[i].payrollProcessDate = new Date()
          // this.overTimeDetails[i].employeeId =  this.overTimeDetails[i].employeeId
          this.overTimeDetails[i].totalNot = this.overTimeDetails[i].notHrs
          this.overTimeDetails[i].totalHot = this.overTimeDetails[i].hotHrs
          this.overTimeDetails[i].totalSot = this.overTimeDetails[i].sotHrs
          this.overTimeDetails[i].notrate = this.overTimeDetails[i].notRate
          this.overTimeDetails[i].hotrate = this.overTimeDetails[i].hotRate
          this.overTimeDetails[i].sotrate = this.overTimeDetails[i].sotRate
          this.overTimeDetails[i].totalNotAmount = this.overTimeDetails[i].notAmount
          this.overTimeDetails[i].totalHotAmount = this.overTimeDetails[i].hotAmount
          this.overTimeDetails[i].totalSotAmount = this.overTimeDetails[i].sotAmount
          this.overTimeDetails[i].processStatus = 0
          this.overTimeDetails[i].payrollOTDetails = [{
             id: this.overTimeDetails[i].id,
             createdDate: this.overTimeDetails[i].createdDate,
             modifiedDate: this.overTimeDetails[i].modifiedDate,
             createdBy: this.overTimeDetails[i].createdBy,
             modifiedBy:this.overTimeDetails[i].modifiedBy ,
             isArchived: this.overTimeDetails[i].isArchived,
             payrollOTSummaryid: 0,
             overTimeId: 1,
             employeeId: this.overTimeDetails[i].employeeId,
             notHrs: this.overTimeDetails[i].notHrs,
             hotHrs: this.overTimeDetails[i].hotHrs,
             sotHrs: this.overTimeDetails[i].sotHrs,
             notHrsAmount: this.overTimeDetails[i].notAmount,
             hotHrsAmount: this.overTimeDetails[i].hotAmount,
             sotHrsAmount: this.overTimeDetails[i].sotAmount
           }]

    }
    // console.log(this.overTimeDetails)
  
      this.payrollProcessService.InsertPayrollOverTimeDetails(this.overTimeDetails).subscribe(res => {
        this.toastr.showSuccessMessage('Over Time Details Saved Successfully.');
       
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Insert Over Time Details.');
      });
  }

  
  getAllLeaveAttendancePayGroup() {

    var month = parseInt(this.payrollmonth)
    var year = parseInt(this.payrollyear)
    var day = parseInt(this.overTimeCutOff)
    var todate = new Date(year,month-1, day)
    var previous = new Date(todate.getTime());
    previous.setMonth(previous.getMonth() - 1);

    
    this.payrollProcessService.getPayrollProcessOvertime(this.paygroupId, this.datePipe.transform(previous,"yyyy-MM-dd"), this.datePipe.transform(todate,"yyyy-MM-dd"))
      .subscribe(result => {
        this.overTimeDetails = result

        this.overTimeDetails =[ {
          id: 0,
          createdDate: "2023-05-13T16:46:42.490Z",
          modifiedDate: "2023-05-13T16:46:42.490Z",
          createdBy: "Lester",
          modifiedBy: "Lester",
          isArchived: true,
          notHrs: 0,
          hotHrs: 0,
          sotHrs: 0,
          employeeId: 0,
          employeeCode: "Lester",
          employeeName: "Lester",
          notRate: 0,
          hotRate: 0,
          sotRate: 0,
          notComponentId :0,
          hotComponentId: 0,
          sotComponentId: 0,
          notAmount: 0,
          hotAmount: 0,
          sotAmount: 0
      },
      {
        id: 0,
        createdDate: "2023-05-13T16:46:42.490Z",
        modifiedDate: "2023-05-13T16:46:42.490Z",
        createdBy: "Lester",
        modifiedBy: "Lester",
        isArchived: true,
        notHrs: 0,
        hotHrs: 0,
        sotHrs: 0,
        employeeId: 0,
        employeeCode: "Letser",
        employeeName: "Lester",
        notRate: 0,
        hotRate: 0,
        sotRate: 0,
        notComponentId: 0,
        hotComponentId: 0,
        sotComponentId: 0,
        notAmount: 0,
        hotAmount: 0,
        sotAmount: 0
    },
    {
      id: 0,
      createdDate: "2023-05-13T16:46:42.490Z",
      modifiedDate: "2023-05-13T16:46:42.490Z",
      createdBy: "Lester",
      modifiedBy :"Lester",
      isArchived: true,
      notHrs: 0,
      hotHrs: 0,
      sotHrs: 0,
      employeeId: 0,
      employeeCode: "Lester",
      employeeName: "Lester",
      notRate: 0,
      hotRate: 0,
      sotRate: 0,
      notComponentId: 0,
      hotComponentId: 0,
      sotComponentId: 0,
      notAmount: 0,
      hotAmount: 0,
      sotAmount: 0
  }]
       
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to fetch the Over Time Details.');
        });
  }

}
