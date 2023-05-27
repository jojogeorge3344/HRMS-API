import { forkJoin } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeSalaryConfigurationService } from '../employee-salary-configuration.service';
import { EmployeeSalaryConfigurationDetailsService } from './../employee-salary-configuration-details.service';
import { EmployeeSalaryConfigurationView } from '../employee-salary-configuration-view.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-salary-view',
  templateUrl: './employee-salary-view.component.html'
})
export class EmployeeSalaryViewComponent implements OnInit {

  employeeId: number;
  monthlySum: number;
  yearlySum: number;

  @Input() effectiveDate: string;
  @Input() salary: EmployeeSalaryConfigurationView[];

  constructor(
    private employeeSalaryConfigurationService: EmployeeSalaryConfigurationService,
    private employeeSalaryConfigurationDetailsService: EmployeeSalaryConfigurationDetailsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      if(params.empId){
      this.employeeId = parseInt(params.empId, 10);
      }else{
        this.employeeId = parseInt(params.id, 10);
      }
    });
  }

  ngOnInit(): void {
    this.getSalaryDetails();
  }

  getSalaryDetails() {
    if (!this.salary) {
      this.employeeSalaryConfigurationService.getSalaryConfigurationByEmployee(this.employeeId).subscribe((salary) => {
        this.salary = salary;
        //  this.currency = this.salaryStructure[0].currencycode;
        if (this.salary.length) {
          this.effectiveDate = this.salary[0].effectiveDate;
        }
        this.monthlySum = this.salary.reduce((sum, x) => sum + x.monthlyAmount, 0);
        this.yearlySum = this.salary.reduce((sum, x) => sum + x.yearlyAmount, 0);
      });
    } else {
      this.monthlySum = this.salary.reduce((sum, x) => sum + x.monthlyAmount, 0);
      this.yearlySum = this.salary.reduce((sum, x) => sum + x.yearlyAmount, 0);
    }
  }

  delete() {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete this salary configuration?`;

    modalRef.result.then((userResponse) => {

      if (userResponse === true) {
        forkJoin([
          this.employeeSalaryConfigurationService.delete(this.employeeId),
          this.employeeSalaryConfigurationDetailsService.delete(this.employeeId)
        ])
          .subscribe(() => {
            this.toastr.showSuccessMessage('Salary configuration deleted successfully!');
            this.salary = null;
          });
      }
    });
  }
}
