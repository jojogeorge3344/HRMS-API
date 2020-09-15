import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PayrollProcessAdhocService } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc.service';
import { AdhocDeductionView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc-deduction-view.model';
import { PayrollCreateAdhocComponent } from '../payroll-create-adhoc/payroll-create-adhoc.component';
import { PayrollEditAdhocComponent } from '../payroll-edit-adhoc/payroll-edit-adhoc.component';
import { PayrollViewAdhocComponent } from '../payroll-view-adhoc/payroll-view-adhoc.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-adhoc-list',
  templateUrl: './payroll-adhoc-list.component.html',
  styles: [
  ]
})
export class PayrollAdhocListComponent implements OnInit {
  employeeId: number;
  id: number;
  @Input() employee;
  payGroupProcessAdhocDeduction: AdhocDeductionView[] = [];
  selectedYear: any;
  selectedMonth: any;
  months = Months;
  constructor(
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private payrollProcessAdhocService: PayrollProcessAdhocService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = params.date.split('-')[0];
    });
    this.getAllAdhocDeductionByPayGroupId();

  }
  getAllAdhocDeductionByPayGroupId() {
    this.payrollProcessAdhocService.getEmployeeAllAdhocDeduction(this.id).subscribe(result => {
      this.payGroupProcessAdhocDeduction = result;
    });
  }
  openAdd() {
    const modalRef = this.modalService.open(PayrollCreateAdhocComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employee = this.employee;
    modalRef.componentInstance.processId = this.id;
    modalRef.componentInstance.payGroupProcessAdhocDeduction = this.payGroupProcessAdhocDeduction;
    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getAllAdhocDeductionByPayGroupId();
      }
    });
  }

  openEditDeduction(adhocDeduction: AdhocDeductionView) {
    const modalRef = this.modalService.open(PayrollEditAdhocComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.adhocDeduction = adhocDeduction;
    modalRef.componentInstance.employee = this.employee;
    modalRef.componentInstance.processId = this.id;
    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getAllAdhocDeductionByPayGroupId();
      }
    });
  }

  openViewDeduction(adhocDeduction: AdhocDeductionView) {
    const modalRef = this.modalService.open(PayrollViewAdhocComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.adhocDeduction = adhocDeduction;
  }

  deleteAdhocDeduction(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Adhoc Deduction ${name} ?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollProcessAdhocService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The Job Title deleted successfully!');
          this.getAllAdhocDeductionByPayGroupId();
        });
      }
    });
  }


}
