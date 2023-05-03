import { FormGroup, FormArray, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { EmployeeSalaryConfigurationView } from "../employee-salary-configuration-view.model";
import { reverse, sortBy, sortedLastIndex } from "lodash";

@Component({
  selector: "hrms-employee-salary-form",
  templateUrl: "./employee-salary-form.component.html",
})
export class EmployeeSalaryFormComponent implements OnInit {
  salaryStructureName: string;

  @Input() salaryForm: FormGroup;
  @Input()
  salaryStructure: EmployeeSalaryConfigurationView[]; /*= [
    {
      id: 0,
      payrollStructureName: "PSN",
      payrollComponentName: "Basic Pay",
      shortCode: "BP",
      isFixed: true,
      isComputed: false,
      formula: null,
      payrollComponentId: 5,
      payrollStructureId: 57,
      isCustomizedAndOverridenAtEmployeeLevel: false,
      maximumLimit: 10000,
      payHeadContractValueType: 0,
      payHeadBaseUnitType: 0,
    },
    {
      id: 55,
      payrollStructureName: "PSN",
      payrollComponentName: "Transportation Allowance",
      shortCode: "TA",
      isFixed: true,
      isComputed: true,
      formula: "[BP]*10",
      payrollComponentId: 10,
      payrollStructureId: 57,
      isCustomizedAndOverridenAtEmployeeLevel: false,
      maximumLimit: 4000,
      payHeadContractValueType: 0,
      payHeadBaseUnitType: 0,
    },
    {
      id: 56,
      payrollStructureName: "PSN",
      payrollComponentName: "Leave Deduction",
      shortCode: "LD",
      isComputed: true,
      formula: "[BP]-20",
      payrollComponentId: 13,
      payrollStructureId: 57,
      isCustomizedAndOverridenAtEmployeeLevel: false,
      maximumLimit: 5000,
      payHeadContractValueType: 0,
      payHeadBaseUnitType: 0,
    },
  ];*/
  @Input() returned: boolean;

  valueObject = {};
  salaryTotalMonthly: number = 0;
  salaryTotalYearly: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.returned) {
      this.setupForm();
    }
    this.calculateTotal();
    this.setupControls();
  }

  setupForm() {
    this.salaryStructure.map((x: any) => {
      this.valueObject[`{${x.shortCode}}`] = x.monthlyAmount;
      (this.salaryForm.controls.salaryArray as FormArray).push(
        this.fb.group({
          monthly: [
            { value: x.monthlyAmount, disabled: x.isComputed },
            {
              // validators: [Validators.required, Validators.min(1), Validators.max(x.maximumLimit)],
              updateOn: "blur",
            },
          ],
          yearly: [
            { value: x.yearlyAmount, disabled: x.isComputed },
            {
              // validators: [Validators.required, Validators.min(1), Validators.max(x.maximumLimit * 12)],
              updateOn: "blur",
            },
          ],
        })
      );
    });

    (this.salaryForm.get("salaryArray") as FormArray).controls.forEach(
      (control) => {
        control.get("yearly").valueChanges.subscribe((res) => {
          const index = (
            this.salaryForm.get("salaryArray") as FormArray
          ).controls.indexOf(control);
          if (res !== this.salaryStructure[index].yearlyAmount) {
            (
              (this.salaryForm.get("salaryArray") as FormArray).at(
                index
              ) as FormGroup
            )
              .get("monthly")
              .patchValue(parseFloat((res / 12).toFixed(2)), {
                emitEvent: false,
              });
            (
              (this.salaryForm.get("salaryArray") as FormArray).at(
                index
              ) as FormGroup
            )
              .get("monthly")
              .markAsDirty();
          }
        });
        control.get("monthly").valueChanges.subscribe((res) => {
          const index = (
            this.salaryForm.get("salaryArray") as FormArray
          ).controls.indexOf(control);
          if (res !== this.salaryStructure[index].monthlyAmount) {
            (
              (this.salaryForm.get("salaryArray") as FormArray).at(
                index
              ) as FormGroup
            )
              .get("yearly")
              .patchValue(parseFloat((res * 12).toFixed(2)), {
                emitEvent: false,
              });
            (
              (this.salaryForm.get("salaryArray") as FormArray).at(
                index
              ) as FormGroup
            )
              .get("yearly")
              .markAsDirty();
          }
        });
      }
    );
  }

  calculateTotal() {
    this.salaryTotalMonthly = this.salaryStructure.reduce(
      (sum, x) => sum + x.monthlyAmount,
      0
    );
    this.salaryTotalYearly = this.salaryStructure.reduce(
      (sum, x) => sum + x.yearlyAmount,
      0
    );
  }

  setupControls() {
    this.salaryForm.controls.salaryArray.valueChanges.subscribe((res) => {
      let monthly = 0;
      let yearly = 0;
      this.salaryStructure = this.salaryStructure.map((comp, i) => {
        this.valueObject[`{${comp.shortCode}}`] = comp.isComputed
          ? comp.monthlyAmount
          : res[i].monthly;
        return {
          ...comp,
          monthlyAmount: this.salaryForm.getRawValue().salaryArray[i].monthly,
          yearlyAmount: this.salaryForm.getRawValue().salaryArray[i].yearly,
        };
      });
      this.getCalculatedValues();

      this.salaryForm.getRawValue().salaryArray.map((control, i) => {
        monthly += this.salaryStructure[i].formula
          ? this.salaryStructure[i].monthlyAmount
          : control.monthly;
        yearly += this.salaryStructure[i].formula
          ? this.salaryStructure[i].yearlyAmount
          : control.yearly;
      });

      this.salaryTotalMonthly = monthly;
      this.salaryTotalYearly = yearly;
    });
  }

  setControl(control, limit) {
    control.markAsDirty();
    control.markAsTouched();
    control.disable({ emitEvent: false });

    if (limit && control.value > limit) {
      control.setErrors({ max: { max: limit } });
    } else if (control.hasError("max")) {
      delete control.errors["max"];
    }

    if (control.value < 1) {
      control.setErrors({ min: { min: 1 } });
    } else if (control.hasError("min")) {
      delete control.errors["min"];
    }
  }

  getCalculatedValues() {
    this.salaryStructure.map((res, i) => {
      const keys = Object.keys(this.valueObject);
      if (res.formula) {
        let formula: string = res.formula;
        keys.forEach((key) => {
          formula = formula.replace(key, this.valueObject[key]);
        });
        formula = formula.replace("[", "");
        formula = formula.replace("]", "");
        res.monthlyAmount = eval(formula);

        ((this.salaryForm.get("salaryArray") as FormArray).at(i) as FormGroup)
          .get("monthly")
          .patchValue(parseFloat(res.monthlyAmount.toFixed(2)), {
            emitEvent: false,
          });
        this.setControl(
          (
            (this.salaryForm.get("salaryArray") as FormArray).at(i) as FormGroup
          ).get("monthly"),
          res.maximumLimit
        );
        this.valueObject[`{${res.shortCode}}`] = res.monthlyAmount;
        res.yearlyAmount = eval(formula) * 12;
        ((this.salaryForm.get("salaryArray") as FormArray).at(i) as FormGroup)
          .get("yearly")
          .patchValue(parseFloat(res.yearlyAmount.toFixed(2)), {
            emitEvent: false,
          });
        this.setControl(
          (
            (this.salaryForm.get("salaryArray") as FormArray).at(i) as FormGroup
          ).get("yearly"),
          res.maximumLimit * 12
        );
      }
    });
  }
}
