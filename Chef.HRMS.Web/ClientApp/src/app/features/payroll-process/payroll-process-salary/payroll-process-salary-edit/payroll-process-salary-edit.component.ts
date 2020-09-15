import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-payroll-process-salary-edit',
  templateUrl: './payroll-process-salary-edit.component.html'
})
export class PayrollProcessSalaryEditComponent implements OnInit {
  @Input() salary;
  @Input() components;
  editForm: FormGroup;
  valueObject = {};
  paygroupId: number;
  id: number;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
    });

  }

  ngOnInit(): void {
    this.salary.values.map((comp) => {
      this.valueObject[`[${comp.shortCode}]`] = comp.formula ? comp.monthlyAmount : comp.monthly;
    });
    this.editForm = this.createFormGroup();
    this.salary.values.map(comp => {
      (this.editForm.controls.components as FormArray)
        .push(this.formBuilder.group(
          {
            monthly: [{ value: comp.monthlyAmount, disabled: false },
            {
              validators: [Validators.required, Validators.min(1), Validators.max(comp.maximumLimit)],
              updateOn: 'blur',
            }],

          }));
    });


  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      components: new FormArray([]),

    });

  }
  onSubmit() {
    const editSalary = this.editForm.getRawValue();
    this.salary.values = this.salary.values.map((component, i) => {
      return {
        ...component,
        monthlyAmount: editSalary.components[i].monthly,

      };
    });

    this.activeModal.close(this.salary);
  }
}