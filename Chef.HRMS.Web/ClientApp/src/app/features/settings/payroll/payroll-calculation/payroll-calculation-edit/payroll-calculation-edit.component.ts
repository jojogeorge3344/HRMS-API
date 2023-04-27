import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { getCurrentUserId } from "@shared/utils/utils.functions";
import { PayrollCalculationService } from "../payroll-calculation.service";
import { PayrollsettingsService } from "../../../../../services/payrollsettings.service";
import { PayrollComponent } from "../../payroll-component/payroll-component.model";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { formulaValidator } from "@shared/utils/validators.functions";
import { PayrollStructureService } from "../../payroll-structure/payroll-structure.service";

@Component({
  selector: "hrms-payroll-calculation-edit",
  templateUrl: "./payroll-calculation-edit.component.html",
})
export class PayrollCalculationEditComponent implements OnInit {
  editForm: FormGroup;
  calculationVariables: any;
  currentUserId: number;
  @Input() selectedPayrollComponents: PayrollComponent[];
  @Input() selectedPayrollComponent: any;
  @Input() selectedComponentName: any;
  @Input() selectedComponentCode: any;
  @Input() structureId: any;
  preview = false;
  selectedComponent: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private payrollsettingsService: PayrollsettingsService,
    private payrollCalculationService: PayrollCalculationService,
    private payrollStructureService: PayrollStructureService
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue({
      formula: this.selectedPayrollComponent[0].formula,
    });
    //this.calculationVariables = this.selectedPayrollComponents;
    this.payrollStructureService
      .getAllActived(this.structureId)
      .subscribe((res) => {
        this.calculationVariables = res;
      });
  }

  onChange(element) {
    if (element.checked) {
      this.getSystemVarible();
    } else {
      this.calculationVariables = this.selectedPayrollComponents;
    }
  }

  getSystemVarible() {
    this.payrollsettingsService.getAll().subscribe(
      (result) => {
        this.calculationVariables = result;
        //console.log(this.calculationVariables)
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage(
          "Unable to fetch the Payroll System Variables"
        );
      }
    );
  }

  passVariable(variable) {
    const formulaValue = this.editForm.value.formula
      ? this.editForm.value.formula
      : "";
    const value = formulaValue + `{${variable.code}}`;
    // const value = [] + (variable.shortCode? `[${variable.shortCode}]` : `{${variable.name}}`)
    this.editForm.patchValue({
      formula: value,
    });
    this.editForm.controls.formula.markAsTouched();
    this.editForm.controls.formula.markAsDirty();
  }

  onSubmit() {
    const assignCalculationOvertimeValue = this.editForm.value;
    // assignCalculationOvertimeValue.id = this.selectedPayrollComponent[0].id;
    // assignCalculationOvertimeValue.payrollComponentId = this.selectedPayrollComponent[0].payrollComponentId;
    // assignCalculationOvertimeValue.payrollStructureId = this.selectedPayrollComponent[0].payrollStructureId;
    // assignCalculationOvertimeValue.isComputed = this.selectedPayrollComponent[0].isComputed;
    if (
      assignCalculationOvertimeValue.id == 0 ||
      assignCalculationOvertimeValue.id == null
    ) {
      this.payrollCalculationService
        .add(assignCalculationOvertimeValue)
        .subscribe(
          (result) => {
            this.toastr.showSuccessMessage(
              "Payroll Formula added successfully"
            );
            this.activeModal.close("submit");
          },
          (error) => {
            console.error(error);
            this.toastr.showErrorMessage("Unable to add the Payroll Formula");
          }
        );
    } else {
      this.payrollCalculationService
        .update(assignCalculationOvertimeValue)
        .subscribe(
          (result) => {
            this.toastr.showSuccessMessage(
              "Payroll Formula updated successfully"
            );
            this.activeModal.close("submit");
          },
          (error) => {
            console.error(error);
            this.toastr.showErrorMessage(
              "Unable to update the Payroll Formula"
            );
          }
        );
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: this.selectedPayrollComponent[0].id,
      payrollComponentId: this.selectedPayrollComponent[0].payrollComponentId,
      payrollStructureId: this.selectedPayrollComponent[0].payrollStructureId,
      isComputed: [true],
      formula: ["", [formulaValidator]],
    });
  }
  isChangeColor(item) {
    console.log(item);
    if (item.color == "SV") {
      return { color: "blueviolet" };
    }
    if (item.color == "UV") {
      return { color: "darkcyan" };
    }
    if (item.color == "PRC") {
      return { color: "chocolate" };
    }
  }
}
