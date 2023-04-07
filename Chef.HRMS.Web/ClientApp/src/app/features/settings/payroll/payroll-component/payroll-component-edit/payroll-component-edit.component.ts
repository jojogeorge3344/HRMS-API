import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PayrollComponentService } from "../payroll-component.service";
import { PayrollComponentType } from "src/app/models/common/types/payrollcomponenttype";
import { PayrollComponent } from "../payroll-component.model";
import { duplicateNameValidator } from "@shared/utils/validators.functions";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { IncludeInPaySlipType } from "src/app/models/common/types/includeinpaysliptype";
import { PayHeadType } from "src/app/models/common/types/payheadtype";
import { RoundingType } from "src/app/models/common/types/roundingtype";
import { PayHeadBaseUnitType } from "src/app/models/common/types/paybaseunittype";
import { PayHeadContractValueType } from "src/app/models/common/types/paycontracttype";

@Component({
  selector: "hrms-payroll-component-edit",
  templateUrl: "./payroll-component-edit.component.html",
})
export class PayrollComponentEditComponent implements OnInit {
  editForm: FormGroup;
  currentUserId: number;

  payHeadTypes = PayHeadType;
  payContractTypes = PayHeadContractValueType;
  payBaseUnitTypes = PayHeadBaseUnitType;
  includePaySlipTypes = IncludeInPaySlipType;
  roundingTypes = RoundingType;

  payrollComponentTypeKeys: number[];
  payHeadTypeKeys: number[];
  payContractTypeKeys: number[];
  payBaseUnitTypeKeys: number[];
  includePaySlipTypeKeys: number[];
  roundingTypeKeys: number[];

  @Input() payrollComponentTypes: PayrollComponentType;
  @Input() payrollComponent: PayrollComponent;
  @Input() isDisabled: boolean;
  @Input() payrollComponentNames: string[];
  @Input() payrollComponentCodes: string[];

  constructor(
    private payrollComponentService: PayrollComponentService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();

    this.payHeadTypeKeys = Object.keys(this.payHeadTypes)
      .filter(Number)
      .map(Number);
    this.payContractTypeKeys = Object.keys(this.payContractTypes)
      .filter(Number)
      .map(Number);
    this.payBaseUnitTypeKeys = Object.keys(this.payBaseUnitTypes)
      .filter(Number)
      .map(Number);
    this.includePaySlipTypeKeys = Object.keys(this.includePaySlipTypes)
      .filter(Number)
      .map(Number);
    this.roundingTypeKeys = Object.keys(this.roundingTypes)
      .filter(Number)
      .map(Number);
    this.payrollComponentService
      .getAllPayrollComponentByType()
      .subscribe((result) => {
        this.payrollComponentTypeKeys = result.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      });

    this.editForm.patchValue(this.payrollComponent);
  }

  get name() {
    return this.editForm.get("name");
  }

  get code() {
    return this.editForm.get("shortCode");
  }

  onSubmit() {
    this.payrollComponentService.update(this.editForm.getRawValue()).subscribe(
      (result: any) => {
        if (result === -1) {
          this.toastr.showErrorMessage("Payroll component already exists!");
        } else {
          this.toastr.showSuccessMessage(
            "Payroll component updated successfully!"
          );
          this.activeModal.close("submit");
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage(
          "There is an error in updating payroll component"
        );
      }
    );
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [""],
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("^([a-zA-Z0-9 ])+$"),
          duplicateNameValidator(this.payrollComponentNames),
        ],
      ],
      payrollComponentType: [
        { value: null, disabled: this.isDisabled },
        [Validators.required],
      ],
      shortCode: [
        "",
        [
          Validators.required,
          Validators.maxLength(7),
          Validators.pattern("^([a-zA-Z0-9])+$"),
          duplicateNameValidator(this.payrollComponentCodes),
        ],
      ],
      description: ["", [Validators.required, Validators.maxLength(128)]],
      payHeadType: [null, Validators.required],
      payHeadContractValueType: [null, Validators.required],
      minimumLimit: [0],
      maximumLimit: [0],
      payHeadBaseUnitType: [null, Validators.required],
      includeInPaySlipType: [null, Validators.required],
      roundingType: [null, Validators.required],
      createdDate: [],
    });
  }
}
