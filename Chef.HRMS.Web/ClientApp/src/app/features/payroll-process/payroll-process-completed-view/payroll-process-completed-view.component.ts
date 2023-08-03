import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PayrollProcessService } from '../payroll-process.service';
import { PayrollReview } from '../payroll-process-preview/payroll-process-preview.model';
import { PayrollProcessSalarydetailsViewComponent } from '../payroll-process-salarydetails-view/payroll-process-salarydetails-view.component';

@Component({
  selector: 'hrms-payroll-process-completed-view',
  templateUrl: './payroll-process-completed-view.component.html',
  styleUrls: ['./payroll-process-completed-view.component.scss']
})
export class PayrollProcessCompletedViewComponent implements OnInit {
  @Input() id: number;
  payrollBreakUp: PayrollReview[] = [];
  employees: any;
  filteredEmployees: any;
  searchKey: any;
  payrollProcessId: any;
  payrollProcessViewDetails: any;

  constructor(
    // public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService,
    public modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.payrollProcessId= parseInt(params.id, 10);
    });
    this.payrollProcessService.getPayrollBreakUp(this.id).subscribe(res => {
      this.payrollBreakUp = res;
    });
    this.payrollProcessService.getPayrollProcessView(this.payrollProcessId).subscribe(res => {
      this.payrollProcessViewDetails = res;
      this.employees=res
    });
  }
  searchEmployee(): void {
    this.payrollProcessViewDetails = this.employees.filter(
      (emp) =>
        emp.employeeName?.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        emp.employeeCode?.toLowerCase().includes(this.searchKey.toLowerCase())
    
    );
  
  }
  viewSalaryDetails(process) {
    const modalRef = this.modalService.open(PayrollProcessSalarydetailsViewComponent,
      { size: 'xl', centered: true, backdrop: 'static', windowClass:'tablealign' });
      modalRef.componentInstance.process = process;
  }
}
