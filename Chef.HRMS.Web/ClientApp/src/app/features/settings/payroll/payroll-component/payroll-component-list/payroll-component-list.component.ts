import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";
import { PayrollComponentService } from "../payroll-component.service";
import { PayrollComponentCreateComponent } from "../payroll-component-create/payroll-component-create.component";
import { PayrollComponentEditComponent } from "../payroll-component-edit/payroll-component-edit.component";
import { PayrollComponentType } from "../../../../../models/common/types/payrollcomponenttype";
import { PayrollComponent } from "../payroll-component.model";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";

@Component({
  selector: "hrms-payroll-component-list",
  templateUrl: "./payroll-component-list.component.html",
})
export class PayrollComponentListComponent implements OnInit {
  public payrollComponents: any;
  assignedPayrollComponents: number[] = [];

  payrollComponentTypes = PayrollComponentType;
  payrollComponentTypeKeys: number[];

  payrollComponentNames: string[];
  payrollComponentCodes: string[];

  constructor(
    private payrollComponentService: PayrollComponentService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) {
    this.payrollComponentTypeKeys = Object.keys(this.payrollComponentTypes)
      .filter(Number)
      .map(Number);
  }

  ngOnInit(): void {
    this.getPayrollComponents();
    this.getAssignedPayrollComponents();
  }

  getPayrollComponents() {
    debugger;
    this.payrollComponentService.getAll().subscribe(
      (result) => {
        this.payrollComponents = result;
        this.payrollComponents = result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
        console.log("comp", this.payrollComponents);

        this.payrollComponentNames = this.payrollComponents.map((a) =>
          a.name.toLowerCase()
        );
        this.payrollComponentCodes = this.payrollComponents.map((a) =>
          a.shortCode.toLowerCase()
        );
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the payroll components");
      }
    );
  }

  getAssignedPayrollComponents() {
    this.payrollComponentService.getAllAssignedPayrollComponents().subscribe(
      (res) => {
        this.assignedPayrollComponents = res;
        console.log("comp", this.assignedPayrollComponents);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isDisabled(payrollComponent) {
    return (
      this.isFixed(payrollComponent.payrollComponentType) ||
      this.assignedPayrollComponents.includes(payrollComponent.id)
    );
  }

  getPayrollComponentTypeName(payrollComponentTypeId) {
    return Object.keys(this.payrollComponentTypes).find(
      (key) =>
        this.payrollComponentTypes[key] === payrollComponentTypeId.toString()
    );
  }

  isFixed(payrollComponent) {
    return (
      payrollComponent.payrollComponentType == this.payrollComponentTypes.Fixed
    );
  }

  openCreatePayrollComponent() {
    const modalRef = this.modalService.open(PayrollComponentCreateComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.payrollComponentTypes =
      this.payrollComponentTypes;
    modalRef.componentInstance.payrollComponentNames =
      this.payrollComponentNames;
    modalRef.componentInstance.payrollComponentCodes =
      this.payrollComponentCodes;

    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getPayrollComponents();
      }
    });
  }

  openEditPayrollComponent(payrollComponent: PayrollComponent) {
    const modalRef = this.modalService.open(PayrollComponentEditComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.payrollComponent = payrollComponent;
    modalRef.componentInstance.payrollComponentTypes =
      this.payrollComponentTypes;
    modalRef.componentInstance.isDisabled = this.isDisabled(payrollComponent);
    modalRef.componentInstance.payrollComponentNames =
      this.payrollComponentNames.filter(
        (v) => v !== payrollComponent.name.toLowerCase()
      );
    modalRef.componentInstance.payrollComponentCodes =
      this.payrollComponentCodes.filter(
        (v) => v !== payrollComponent.shortCode.toLowerCase()
      );

    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getPayrollComponents();
      }
    });
  }

  deletePayrollComponent(payrollComponent: PayrollComponent) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the payroll component ${payrollComponent.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollComponentService
          .delete(payrollComponent.id)
          .subscribe(() => {
            this.toastr.showSuccessMessage(
              "The payroll component is deleted successfully!"
            );
            this.getPayrollComponents();
          });
      }
    });
  }
}
