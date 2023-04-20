import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { PayrollStructureService } from '../payroll-structure.service';
import { PayrollConfigurationService } from '../../payroll-configuration/payroll-configuration.service';
import { PayrollStructureCreateComponent } from '../payroll-structure-create/payroll-structure-create.component';
import { PayrollStructureEditComponent } from '../payroll-structure-edit/payroll-structure-edit.component';
import { PayrollStructureAssignComponent } from '../payroll-structure-assign/payroll-structure-assign.component';
import { PayrollStructure } from '../payroll-structure.model';
import { PayrollConfiguration } from '../../payroll-configuration/payroll-configuration.model';
import { PayrollComponent } from '@settings/payroll/payroll-component/payroll-component.model';
import { PayrollComponentService } from '@settings/payroll/payroll-component/payroll-component.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollStructureViewComponent } from '../payroll-structure-view/payroll-structure-view.component';


@Component({
  selector: 'hrms-payroll-structure-list',
  templateUrl: './payroll-structure-list.component.html'
})
export class PayrollStructureListComponent implements OnInit {

  payrollStructures: PayrollStructure[];
  assignedPayrollStructures: number[] = [];
  assignedPayrollComponents: PayrollConfiguration[];
  allPayrollComponents: PayrollComponent[];
  payrollStructureNames: string[];

  firstOpen: number;

  constructor(
    private payrollStructureService: PayrollStructureService,
    private payrollComponentService: PayrollComponentService,
    private payrollConfigurationService: PayrollConfigurationService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.firstOpen = params.payrollStructureId;
    });

    this.getPayrollStructures();
    this.getAllPayrollComponents();
    this.getAssignedPayrollStructures();
  }

  getPayrollStructures() {
    this.payrollStructureService.getAll().subscribe(result => {

      if (!this.firstOpen && result.length) {
        this.firstOpen = result[0].id;
      }

      this.getPayrollComponents(this.firstOpen);
     debugger
      this.payrollStructures = result;
      this.payrollStructureNames = this.payrollStructures.map(a => a.name.toLowerCase());
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Payroll Structures');
      });
  }

  getAssignedPayrollStructures() {
    this.payrollStructureService.getAssignedPayrollStructures().subscribe(res => {
      this.assignedPayrollStructures = res;
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(payrollStructure) {
    return this.assignedPayrollStructures.includes(payrollStructure.id);
  }

  getPayrollStructure(payrollStructureId: number): PayrollStructure {
    return this.payrollStructures.find(v => v.id == payrollStructureId);
  }

  getPayrollComponents(payrollStructureId) {
    this.assignedPayrollComponents = null;

    this.payrollConfigurationService.getAll(payrollStructureId).subscribe(result => {

      this.assignedPayrollComponents = result;
      if (this.assignedPayrollComponents.length === 0 && this.getPayrollStructure(payrollStructureId).isConfigured) {
        this.updateConfigured(payrollStructureId, false);
      }

      if (this.assignedPayrollComponents.length > 0 && this.isAllConfigured()) {
        this.updateConfigured(payrollStructureId, true);
      }
    },
      error => {
        console.error(error);
      });
  }

  isAllConfigured(): boolean {
    return this.assignedPayrollComponents.every(e => e.isConfigured);
  }

  updateConfigured(payrollStructureId: number, isConfigured: boolean) {
    this.payrollStructureService.updatePayrollStructure(payrollStructureId, isConfigured).subscribe((result) => {
      this.getPayrollStructure(payrollStructureId).isConfigured = isConfigured;
    },
      error => {
        console.error(error);
      });
  }

  getAllPayrollComponents() {
    this.payrollComponentService.getAll().subscribe(result => {
      this.allPayrollComponents = result;
    },
      error => {
        console.error(error);
      });
  }

  openCreatePayrollStructure() {
    const modalRef = this.modalService.open(PayrollStructureCreateComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.payrollStructureNames = this.payrollStructureNames;

    modalRef.result.then((result) => {
      if (!isNaN(result)) {
        this.firstOpen = result;
        this.getPayrollStructures();
      }
    });
  }

  openEditPayrollStructure(payrollStructure: PayrollStructure) {
    debugger
    const modalRef = this.modalService.open(PayrollStructureEditComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.payrollStructure = payrollStructure;
    modalRef.componentInstance.payrollStructureNames = this.payrollStructureNames.filter(v => v !== payrollStructure.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.firstOpen = payrollStructure.id;
        this.getPayrollStructures();
      }
    });
  }
  openViewPayrollStructure(payrollStructure: PayrollStructure) {
    const modalRef = this.modalService.open(PayrollStructureViewComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.payrollStructure = payrollStructure;
    modalRef.componentInstance.payrollStructureNames = this.payrollStructureNames.filter(v => v !== payrollStructure.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.firstOpen = payrollStructure.id;
        this.getPayrollStructures();
      }
    });
  }

  deletePayrollStructure(payrollStructure: PayrollStructure) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the payroll structure "${payrollStructure.name}?"`;


    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollStructureService.delete(payrollStructure.id).subscribe(() => {
          this.toastr.showSuccessMessage('The payroll structure deleted successfully!');
          this.getPayrollStructures();
        });
      }
    });
  }

  openAssignPayrollComponent(payrollStructure: PayrollStructure) {
    this.payrollConfigurationService.getAll(payrollStructure.id).subscribe(result => {
      this.assignedPayrollComponents = result;

      const modalRef = this.modalService.open(PayrollStructureAssignComponent,
        { centered: true, backdrop: 'static' });

      modalRef.componentInstance.payrollStructure = payrollStructure;
      modalRef.componentInstance.assignedPayrollComponents = this.assignedPayrollComponents;
      modalRef.componentInstance.allPayrollComponents = this.allPayrollComponents;

      modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getPayrollComponents(payrollStructure.id);
        }
      });
    },
      error => {
        console.error(error);
      });
  }

  removePayrollConfigurationComponent(payrollComponentConfiguration: PayrollConfiguration) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to remove the payroll component "${payrollComponentConfiguration.name}"?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollConfigurationService.delete(payrollComponentConfiguration.id).subscribe(() => {
          this.toastr.showSuccessMessage('The payroll component removed from the payroll structure successfully!');
          this.getPayrollComponents(payrollComponentConfiguration.payrollStructureId);
        });
      }
    });
  }

  openPayrollComponentConfiguration(payrollComponentConfiguration: PayrollConfiguration, isDisabled: boolean) {
    if (isDisabled) {
      this.router.navigate(
        ['../' + payrollComponentConfiguration.payrollStructureId + '/payroll-configuration/' + payrollComponentConfiguration.id + '/view'],
        { relativeTo: this.route.parent });
    } else {
      this.router.navigate(
        ['../' + payrollComponentConfiguration.payrollStructureId + '/payroll-configuration/' + payrollComponentConfiguration.id + '/edit'],
        { relativeTo: this.route.parent });
    }

  }
}
