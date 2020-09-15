import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-payroll-lop-formula-edit',
  templateUrl: './payroll-lop-formula-edit.component.html'
})
export class PayrollLopFormulaEditComponent implements OnInit {
  @Input() components;
  @Input() formula;
  editedFormula: string;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.editedFormula = this.formula;

  }
  addComponent(component) {
    this.editedFormula +=  `[${component.shortCode}]`;

  }
  onSubmit(){
    this.activeModal.close(this.editedFormula);
  }

}
