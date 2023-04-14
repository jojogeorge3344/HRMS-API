import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PayrollComponentService } from "../payroll-component.service";
import { PayrollComponentType } from "src/app/models/common/types/payrollcomponenttype";
import { PayrollComponent } from "../payroll-component.model";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { IncludeInPaySlipType } from "src/app/models/common/types/includeinpaysliptype";
import { PayHeadType } from "src/app/models/common/types/payheadtype";
import { RoundingType } from "src/app/models/common/types/roundingtype";
import { PayHeadBaseUnitType } from "src/app/models/common/types/paybaseunittype";
import { PayHeadContractValueType } from "src/app/models/common/types/paycontracttype";

@Component({
  selector: 'hrms-payroll-component-view',
  templateUrl: './payroll-component-view.component.html',
  styleUrls: ['./payroll-component-view.component.scss']
})
export class PayrollComponentViewComponent implements OnInit {
  viewForm: FormGroup;
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
    this.viewForm = this.createFormGroup();

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

    this.viewForm.patchValue(this.payrollComponent);
  }

  get name() {
    return this.viewForm.get("name");
  }

  get code() {
    return this.viewForm.get("shortCode");
  }


  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [""],
      name: [
        "",
      ],
      payrollComponentType: [
      ],
      shortCode: [
        "", ],
      description: [""],
      payHeadType: [null],
      payHeadContractValueType: [null],
      minimumLimit: [0],
      maximumLimit: [0],
      payHeadBaseUnitType: [null],
      includeInPaySlipType: [null],
      roundingType: [null],
      createdDate: [],
    });
  }
}
