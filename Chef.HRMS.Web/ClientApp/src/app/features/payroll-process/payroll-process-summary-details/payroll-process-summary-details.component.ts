import { Component, OnInit } from '@angular/core';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessService } from '../payroll-process.service';
import { ActivatedRoute, Router } from '@angular/router';



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
  overTimeDetails:any=[]
  overTimeCutOff:any
  treeData:any
  constructor(
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
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
    });


    this.treeData = [
      {
          text: "Parent-Item-1",
          nodes: [
              {
                  text: "Child-Item-1",
                  nodes: [
                      {
                          text: "Grandchild-Item-1"
                      },
                      {
                          text: "Grandchild-Item-2"
                      }
                  ]
              },
              {
                  text: "Child-Item-2"
              }
          ]
      },
      {
          text: "Parent-Item-2"
      },
      {
          text: "Parent-Item-3"
      },
      {
          text: "Parent-Item-4"
      },
      {
          text: "Parent-Item-5"
      }
  ];
  }

  

 

}
