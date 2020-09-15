import { Component, OnInit, Input } from '@angular/core';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { EmployeeBonusCreateComponent } from '../employee-bonus-create/employee-bonus-create.component';
import { EmployeeBonusEditComponent } from '../employee-bonus-edit/employee-bonus-edit.component';
import { EmployeeBonusViewComponent } from '../employee-bonus-view/employee-bonus-view.component';

import { BonusTypes } from '../bonus-types.model';
import { EmployeeBonus } from '../employee-bonus.model';

import { EmployeeBonusService } from '../employee-bonus.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-bonus-list',
  templateUrl: './employee-bonus-list.component.html'
})
export class EmployeeBonusListComponent implements OnInit {

  employeeId: number;
  bonuses: EmployeeBonus[] = [];
  bonusTypes: BonusTypes[];
  bonusTotal: number;

  @Input() showRemarks: boolean;

  constructor(
    private employeeBonusService: EmployeeBonusService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute) {
      this.route.params.subscribe((params: any) => {
        this.employeeId = parseInt(params.id, 10);
      });
     }

  ngOnInit(): void {
    this.employeeBonusService.getBonusTypes().subscribe(res => {
      this.bonusTypes = res;
    });
    this.getBonusDetails();
  }

  getBonusDetails() {
    this.employeeBonusService.getBonusByEmployee(this.employeeId).subscribe((bonus) => {
      this.bonuses = bonus;
      this.bonusTotal = bonus.reduce((sum, x) => sum + x.amount, 0);
    });
  }

  getBonusTypeName(id) {
    if (this.bonusTypes?.length) {
      const bonusName = this.bonusTypes.find(s => s.id == id);
      return bonusName.name;
    }
    return null;

  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeeBonusCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.componentInstance.employeeId = this.employeeId;

    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getBonusDetails();
      }
    }, error => {
      console.log(error);
    });
  }

  openEdit(bonus) {

    const modalRef = this.modalService.open(EmployeeBonusEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.componentInstance.bonus = bonus;
    modalRef.componentInstance.employeeId = this.employeeId;

    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getBonusDetails();
      }
    }, error => {
      console.log(error);
    });
  }

  openView(bonus) {
    const modalRef = this.modalService.open(EmployeeBonusViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    bonus.disburseOn = new Date(bonus.disburseOn);

    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.componentInstance.bonus = bonus;
    modalRef.componentInstance.employeeId = this.employeeId;
  }

  delete(bonus) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the bonus ${this.getBonusTypeName(bonus.bonusTypeId)}?`;

    modalRef.result.then((userResponse) => {

      if (userResponse === true) {
        this.employeeBonusService.delete(bonus.id).subscribe(() => {
          this.toastr.showSuccessMessage('The Bonus is deleted successfully!');
          this.getBonusDetails();
        });
      }
    });
  }

  deleteAll() {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete all bonuses?`;

    modalRef.result.then((userResponse) => {

      if (userResponse === true) {
        this.employeeBonusService.deletebonusOfEmployee(this.employeeId).subscribe(() => {
          this.toastr.showSuccessMessage('Bonuses are deleted successfully!');
          this.getBonusDetails();
        });
      }
    });
  }
}
