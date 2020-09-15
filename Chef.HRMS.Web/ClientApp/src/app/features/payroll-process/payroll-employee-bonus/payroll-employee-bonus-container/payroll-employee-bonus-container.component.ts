import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '@features/employee/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

import { PayrollProcessService } from '@features/payroll-process/payroll-process.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-employee-bonus-container',
  templateUrl: './payroll-employee-bonus-container.component.html',
  styleUrls: ['./payroll-employee-bonus-container.component.scss']
})
export class PayrollEmployeeBonusContainerComponent implements OnInit {
  @Input() employee: Employee;
  @Output() selectTab = new EventEmitter<number>();
  id: number;
  constructor(
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params.id, 10);

    });
  }

  onSubmit(routeTo) {
    this.payrollProcessService.updateProcessedStep(this.id, 2, { id: this.id, stepNumber: 2 })
      .subscribe(res => {
        this.toastr.showSuccessMessage('Payroll Bonus Processing Completed');
        if (routeTo === 'continue') {
          this.selectTab.emit(4);
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }

}
