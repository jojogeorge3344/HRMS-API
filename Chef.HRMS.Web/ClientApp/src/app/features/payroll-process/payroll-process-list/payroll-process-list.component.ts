import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { PayrollProcessService } from '../payroll-process.service';
import { ModeOfPayrollProcessType } from '../../../models/common/types/modeofpayrollprocesstype';
import { Router, ActivatedRoute } from '@angular/router';
import { PayrollProcess } from '../payroll-process.model';
import { PayrollProcessCompletedViewComponent } from '../payroll-process-completed-view/payroll-process-completed-view.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-list',
  templateUrl: './payroll-process-list.component.html'
})
export class PayrollProcessListComponent implements OnInit {
  payrollProcess: PayrollProcess[] = [];
  modeOfPayrollProcessType = ModeOfPayrollProcessType;
  paygroup: any;

  constructor(
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paygroup = params.payGroup;
    });
    this.getAllPayrollProcessingMethods();
  }

  getAllPayrollProcessingMethods() {
    this.payrollProcessService.getAll().subscribe(result => {
      this.payrollProcess = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Payroll Process Details');
      });
  }

  viewSummary(process) {
    const modalRef = this.modalService.open(PayrollProcessCompletedViewComponent,
      { size: 'xl', centered: true, backdrop: 'static' });
    modalRef.componentInstance.id = process.id;
  }

  processSetup(process) {
    const month = process.name.split(' - ')[0];
    const year = process.name.split(' - ')[1].substring(0, 4);
    if (process.payGroupId) {
      this.router.navigate(['/payroll-processing/payroll-process-setup'],
        { queryParams: { date: `${month}-${year}`, payGroup: process.payGroupId, id: process.id } });
    } else {
      this.router.navigate(['/payroll-processing/payroll-process-employee'],
        { queryParams: { date: `${month}-${year}`, id: process.id, employee: process.employeeId } });
    }
  }

}
