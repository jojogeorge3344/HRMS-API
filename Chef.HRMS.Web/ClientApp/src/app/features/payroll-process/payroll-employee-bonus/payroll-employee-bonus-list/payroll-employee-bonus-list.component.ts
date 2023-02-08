import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ActivatedRoute } from '@angular/router';

import { PayrollEmployeeCreateBonusComponent } from '../payroll-employee-create-bonus/payroll-employee-create-bonus.component';
import { PayrollEmployeeEditBonusComponent } from '../payroll-employee-edit-bonus/payroll-employee-edit-bonus.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { PayrollEmployeeViewBonusComponent } from '../payroll-employee-view-bonus/payroll-employee-view-bonus.component';
import { BonusTypes } from '@features/employee/employee-bonus/bonus-types.model';
import { EmployeeBonusService } from '@features/employee/employee-bonus/employee-bonus.service';
import { EmployeeBonus } from '@features/employee/employee-bonus/employee-bonus.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessService } from '@features/payroll-process/payroll-process.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrms-payroll-employee-bonus-list',
  templateUrl: './payroll-employee-bonus-list.component.html',
  styleUrls: ['./payroll-employee-bonus-list.component.scss']
})
export class PayrollEmployeeBonusListComponent implements OnInit {

  employeeId: number;
  id: number;
  methodId:number
  bonusTypes: BonusTypes[];
  employeeSub: Subscription
  payrollEmployeeBonus: EmployeeBonus[] = [];

  constructor(
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private employeeBonusService: EmployeeBonusService,
    public payrollprocessSrv: PayrollProcessService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);
    });
    // this.getAllBonusByEmployeeId();
this.employeeSub = this.payrollprocessSrv.getEmployeeDetailsSubject().subscribe(resp => {
  
  this.methodId = +resp[0].id
  this.getAllBonusByEmployeeId()
})
    this.getBonusTypes();
  }

  getBonusTypes() {
    this.employeeBonusService.getBonusTypes().subscribe(res => {
      this.bonusTypes = res;
    });
  }

  getAllBonusByEmployeeId() {
    this.employeeBonusService.getBonusByEmployeeId(this.employeeId, this.methodId).subscribe(result => {
      this.payrollEmployeeBonus = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Payroll Employee Bonus');
    });
  }


  openAddBonus() {
    const modalRef = this.modalService.open(PayrollEmployeeCreateBonusComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.componentInstance.PayrollProcessId = this.id;
    modalRef.componentInstance.employeeId = this.employeeId;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllBonusByEmployeeId();
      }
    });
  }

  openEditBonus(bonus) {
    const modalRef = this.modalService.open(PayrollEmployeeEditBonusComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.componentInstance.PayrollProcessId = this.id;
    modalRef.componentInstance.employeeId = this.employeeId;
    bonus = {
        ...bonus,
        disburseOn: new Date(bonus.disburseOn)
        };
    modalRef.componentInstance.bonus = bonus;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllBonusByEmployeeId();
      }
    });
  }

  openViewBonus(bonus) {
    const modalRef = this.modalService.open(PayrollEmployeeViewBonusComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.componentInstance.PayrollProcessId = this.id;
    modalRef.componentInstance.employeeId = this.employeeId;
    bonus = {
        ...bonus,
        disburseOn: new Date(bonus.disburseOn)
        };
    modalRef.componentInstance.bonus = bonus;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllBonusByEmployeeId();
      }
    });
  }

  deleteBonus(employeebonus) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Employee Bonus ${employeebonus.name} ?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeBonusService.delete(employeebonus.employeeBonusId).subscribe(() => {
          this.toastr.showSuccessMessage('The Employee Bonus deleted successfully!');
          this.getAllBonusByEmployeeId();
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.employeeSub) this.employeeSub.unsubscribe()
  }

}
