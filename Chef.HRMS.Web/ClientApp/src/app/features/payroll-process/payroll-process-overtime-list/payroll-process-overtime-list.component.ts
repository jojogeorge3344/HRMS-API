import { Component, OnInit } from '@angular/core';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessService } from '../payroll-process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    });
    this.getAllLeaveAttendancePayGroup()
  }

  onSubmit(){
    if(this.overTimeDetails.length > 0){
    
    }else {
      this.toastr.showErrorMessage('Nothing to save.');
    }
   
    
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
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to fetch the Over Time Details.');
        });
  }

}
