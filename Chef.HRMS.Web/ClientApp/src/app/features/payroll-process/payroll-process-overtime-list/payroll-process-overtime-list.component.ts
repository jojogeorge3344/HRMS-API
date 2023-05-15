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
  overTimeDetailsSort:any=[]
  payrollOvertimeDetails:any=[]
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

    if(this.overTimeDetails.length == 0){
      this.toastr.showErrorMessage('Nothing to save.');
      return 
    }

    
    // for(let i=0;i<this.overTimeDetails.length;i++){
         
    //       this.overTimeDetails[i].payrollProcessId =  parseInt(this.payrollProcessId)
    //       this.overTimeDetails[i].payrollProcessDate = new Date()
    //       this.overTimeDetails[i].totalNot = this.overTimeDetails[i].notHrs
    //       this.overTimeDetails[i].totalHot = this.overTimeDetails[i].hotHrs
    //       this.overTimeDetails[i].totalSot = this.overTimeDetails[i].sotHrs
    //       this.overTimeDetails[i].notrate = this.overTimeDetails[i].notRate
    //       this.overTimeDetails[i].hotrate = this.overTimeDetails[i].hotRate
    //       this.overTimeDetails[i].sotrate = this.overTimeDetails[i].sotRate
    //       this.overTimeDetails[i].totalNotAmount = this.overTimeDetails[i].notAmount
    //       this.overTimeDetails[i].totalHotAmount = this.overTimeDetails[i].hotAmount
    //       this.overTimeDetails[i].totalSotAmount = this.overTimeDetails[i].sotAmount
    //       this.overTimeDetails[i].processStatus = 0
    //       this.overTimeDetails[i].payrollOTDetails = [{
            
    //          id: this.overTimeDetails[i].id,
    //          createdDate: this.overTimeDetails[i].createdDate,
    //          modifiedDate: this.overTimeDetails[i].modifiedDate,
    //          createdBy: this.overTimeDetails[i].createdBy,
    //          modifiedBy:this.overTimeDetails[i].modifiedBy ,
    //          isArchived: this.overTimeDetails[i].isArchived,
    //          payrollOTSummaryid: 0,
    //          overTimeId: this.overTimeDetails[i].overTimeId,
    //          employeeId: this.overTimeDetails[i].employeeId,
    //          notHrs: this.overTimeDetails[i].notHrs,
    //          hotHrs: this.overTimeDetails[i].hotHrs,
    //          sotHrs: this.overTimeDetails[i].sotHrs,
    //          notHrsAmount: this.overTimeDetails[i].notAmount,
    //          hotHrsAmount: this.overTimeDetails[i].hotAmount,
    //          sotHrsAmount: this.overTimeDetails[i].sotAmount,
             
    //        }]

    // }
    
    const groupByCategory = this.overTimeDetails.reduce((group, product) => {
      const { employeeId } = product;
      group[employeeId] = group[employeeId] ?? [];
      group[employeeId].push(product);
      return group;
    }, {});
    
    console.log(groupByCategory);
    this.overTimeDetailsSort.push(groupByCategory)
    console.log('arrayt',this.overTimeDetailsSort)
    let keys = Object.keys(this.overTimeDetailsSort[0])
    console.log('keys',keys)
    console.log('firte',this.overTimeDetailsSort[0][111])

    for(let i=0;i<keys.length;i++){
      let key = keys[i]
      let data= this.overTimeDetailsSort[0][key]
      let overtimedetails =[]
      let totalNot =0
      let totalHot =0
      let totalSot =0

      let notrate = 0
      let hotrate = 0
      let sotrate =0

      let totalNotAmount =0
      let totalHotAmount =0
      let totalSotAmount =0

      let modifiedBy
      let createdBy
      let employee

      for(let j=0;j<data.length;j++){
        overtimedetails.push({id:data[j].id,createdDate:data[j].createdDate,modifiedDate:data[j].modifiedDate,
          createdBy:data[j].createdBy,modifiedBy:data[j].modifiedBy,isArchived:data[j].isArchived,payrollOTSummaryid:0,
          overTimeId:data[j].overTimeId,employeeId:data[j].employeeId,notHrs:data[j].notHrs,hotHrs:data[j].hotHrs,sotHrs:data[j].sotHrs,
          notHrsAmount:data[j].notAmount,hotHrsAmount:data[j].hotAmount,sotHrsAmount:data[j].sotAmount})
          totalNot = totalNot + data[j].notHrs
          totalHot = totalHot +data[j].hotHrs
          totalSot = totalSot + data[j].sotHrs
          
          notrate = notrate +data[j].notRate
          hotrate = hotrate +data[j].hotRate
          sotrate =sotrate + data[j].sotRate


          totalNotAmount = totalNotAmount + data[j].notAmount
          totalHotAmount = totalHotAmount + data[j].hotAmount
          totalSotAmount = totalSotAmount + data[j].sotAmount

          modifiedBy = data[0].modifiedBy
          createdBy = data[0].modifiedBy
          employee = data[0].employeeId
          
      }
      this.payrollOvertimeDetails.push({
       id:0,createdDate:new Date(),modifiedDate:new Date(),createdBy:createdBy,modifiedBy:modifiedBy,
       isArchived:false,payrollProcessId:this.payrollProcessId,payrollProcessDate :new Date(),
       employeeId:employee,totalNot : totalNot,totalHot:totalHot,totalSot:totalSot,notrate:notrate,hotrate:hotrate,
       sotrate:sotrate,totalNotAmount:totalNotAmount,totalHotAmount:totalHotAmount,totalSotAmount:totalSotAmount,processStatus:0,
       payrollOTDetails:overtimedetails
      })
    }


      this.payrollProcessService.InsertPayrollOverTimeDetails(this.payrollOvertimeDetails).subscribe(res => {
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
       
       
          
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to fetch the Over Time Details.');
        });
  }

}
