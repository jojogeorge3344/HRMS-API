import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PayrollStructure } from '../payroll-structure.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';

@Component({
  selector: 'hrms-payroll-structure-view',
  templateUrl: './payroll-structure-view.component.html'
})
export class PayrollStructureViewComponent implements OnInit {

  currentUserId: number;
  viewForm: FormGroup;

  @Input() payrollStructure: PayrollStructure;
  @Input() payrollStructureNames: string[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.viewForm = this.createFormGroup();
  }

  get name() { return this.viewForm.get('name'); }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.payrollStructure.id],
      name: [this.payrollStructure.name, [
      ]],
      description: [this.payrollStructure.description, [
      ]],
      createdDate: [this.payrollStructure.createdDate],
    });
  }

}
