import { Component, OnInit } from '@angular/core';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessService } from '../payroll-process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollProcessEmployeeSummarydetailsComponent } from '../payroll-process-employee-summarydetails/payroll-process-employee-summarydetails.component';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'hrms-payroll-process-summary-details',
  templateUrl: './payroll-process-summary-details.component.html',
  styleUrls: ['./payroll-process-summary-details.component.scss']
})
export class PayrollProcessSummaryDetailsComponent implements OnInit {
  payrollmonth:any
  payrollyear:any
  payrollcutoff:any
  id:any
  paygroupId:any
  month:any
  summaryDetails:any=[]
  overTimeCutOff:any
  treeData: any=[];
  payrollProcessId:any
  files: TreeNode[];
  cols: { field: string; header: string; }[];
  summaryDetailsTreeData:TreeNode[];
  
  constructor(
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public modalService: NgbModal,
  ) {
   
   }

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
    this.updatePayrollSummaryDetails()
  }

  updatePayrollSummaryDetails(){
    this.payrollProcessService.updatePayrollSummaryDetails(this.paygroupId,parseInt(this.payrollProcessId),this.datePipe.transform(new Date(),"yyyy-MM-dd")).subscribe(res => {
        this.getPayrollProcessingSummaryDetails()
         
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Insert Payroll Summary Details.');
      });
  }

   getPayrollProcessingSummaryDetails(){
    this.summaryDetails=[]
    this.payrollProcessService.getPayrollProcessingSummaryDetails(parseInt(this.payrollProcessId))
    .subscribe(result => {
      this.summaryDetails = result
      console.log('summarydetails',this.summaryDetails)
      console.log('this.files',this.files)
      for(let i=0;i< this.summaryDetails.length;i++){
          var data=[]
          var child =[]
          var childdata=[]
          child = this.summaryDetails[i].payrollComponentDetails
          data.push({
            data1:this.summaryDetails[i].employeeCode == null ? '' : this.summaryDetails[i].employeeCode,
            data2:this.summaryDetails[i].employeeName,
            data3:this.summaryDetails[i].totalEarnings,
            data4:this.summaryDetails[i].totalDeductions,
            data5:this.summaryDetails[i].netSalaryAmount
          })

          for(let i=0;i<child.length;i++){
            var node = {
              data1:'',
              data2:child[i].payrollComponentName,
              data3:child[i].earningsAmt,
              data4:child[i].deductionAmt,
              data5:''

            }
            childdata.push({data:node})
           

          }
      }
      var finalData =[]
      if(data){
        finalData.push({data:data[0],children:childdata})
      }
      
      
      this.summaryDetailsTreeData = finalData
      console.log('this.summaryDetailsTreeData',this.summaryDetailsTreeData)

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Summary  Details.');
      });
   }

   onSubmit(){
    this.payrollProcessService.completePayrollProcess(this.payrollProcessId).subscribe(res => {
        this.toastr.showSuccessMessage('Payroll Process Completed Successfully.');
         
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Complete  Payroll Process.');
      });
  }

  openEmployeeSummaryDetails(data){
    const modalRef = this.modalService.open(PayrollProcessEmployeeSummarydetailsComponent,
      { size: 'xl', centered: true, backdrop: 'static' 
    });
    modalRef.componentInstance.summaryDetails= data.payrollComponentDetails;
  }

}
