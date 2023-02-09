import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Employee } from '@features/employee/employee.model';
import { PayrollProcessPreviewServiceService } from '../payroll-process-preview/payroll-process-preview-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollProcessService } from '../payroll-process.service';
import { PayrollLopService } from '../payroll-process-preview/payroll-lop.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrms-payroll-employee-review',
  templateUrl: './payroll-employee-review.component.html',
  styles: [
  ]
})
export class PayrollEmployeeReviewComponent implements OnInit {
  @Output() selectTab = new EventEmitter<number>();
  @Input() employee: Employee;
  employeeId: number;
  id: number;
  basic = { type: '', values: [], sum: 0 };
  bonus = { type: '', values: [], sum: 0 };
  lop;
  adhoc = { type: '', values: [], sum: 0 };
  methodId:number
  employeeSub: Subscription
  constructor(
    private payrollProcessService: PayrollProcessService,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService,
    private router: Router,
    private payrollLopService: PayrollLopService,
    private payrollProcessPreviewServiceService: PayrollProcessPreviewServiceService) {
    this.route.queryParams.subscribe(params => {

      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);

    });
  }

  ngOnInit(): void {
    this.employeeSub = this.payrollProcessService.getEmployeeDetailsSubject().subscribe(resp => {
      this.methodId = +resp[0]?.id
      this.payrollProcessPreviewServiceService.getEmployeeBreakup(this.employeeId, this.methodId)
      .subscribe((res: any) => {
        res.map(group => {
          group.sum = group.values.reduce((sum, x) => sum + x.amount, 0);
          return group;
        });
        if (res.find(component => component.type === 'Basic')) {
          this.basic = res.find(component => component.type === 'Basic');
        }
        if (res.find(component => component.type === 'Lop')) {
          this.lop = res.find(component => component.type === 'Lop');
        }
        if (res.find(component => component.type === 'Bonus')) {
          this.bonus = res.find(component => component.type === 'Bonus');
        }
        if (res.find(component => component.type === 'Adhoc')) {
          this.adhoc = res.find(component => component.type === 'Adhoc');
        }
      });
      this.getEmployeeLop();
  })


    

  }
 getEmployeeLop(){
  debugger
  this.payrollLopService.getEmployeeLop(this.employeeId, this.methodId)
      .subscribe(res =>
        this.lop = res
      );
 }
  onSubmit() {
    let lop;
    if (this.lop && this.lop.lossOfPay) {
      lop = [{
        employeeId: this.employeeId,
        numberOfDays: this.lop.lossOfPay,
        lOPAmount: this.lop.lopDeduction,
        payrollProcessingMethodId: this.id
      }];
    }


    this.payrollProcessService.updateProcessedStep(this.id, 5, { id: this.methodId, stepNumber: 5 })
      .subscribe(res => {
        // if (res) {
          if (lop && lop .length) {
            this.payrollProcessService.insertLop(lop)
              .subscribe(() => {
                return this.endpayrollProcess();
              });
          } else {
            this.endpayrollProcess();
          }

        // }
      });
  }
  endpayrollProcess(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.toastr.showSuccessMessage('Payroll Process Completed');
  }

}
