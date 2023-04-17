import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollComponentService } from '@settings/payroll/payroll-component/payroll-component.service';
import { PayrollComponent } from '@settings/payroll/payroll-component/payroll-component.model';


@Component({
  selector: 'hrms-overtime-policy-calculation',
  templateUrl: './overtime-policy-calculation.component.html'
})
export class OvertimePolicyCalculationComponent implements OnInit {

  components: PayrollComponent[];
  editedFormula: string;

  @Input() formula: string;
  @Input() formulaType: string;
  changeVacation: boolean=false;
  changeIncluded: boolean=false;
  
  constructor(private payrollComponentService: PayrollComponentService,
    public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.getPayrollComponents();
    this.editedFormula = this.formula;
    console.log("this.formula",this.editedFormula)
    if(this.formulaType=="vacationSalaryFormula"){
      this.changeVacation=true
    }
    if(this.formulaType=="includedBenefits"){
      this.changeIncluded=true
    }

  }

  getTitle() {
    if (this.formulaType == 'normalFormula') {
      return "Normal Working Days"
    }

    if (this.formulaType == 'holidayFormula') {
      return "Holiday"
    }

    if (this.formulaType == 'specialFormula') {
      return "Special"
    }
  }

  getPayrollComponents() {
    this.payrollComponentService.getAll().subscribe(res => {
      this.components = res;
    });
  }

  addComponent(component) {
    this.editedFormula +=  `[${component.shortCode}]`;
  }

  onSubmit(){
    this.activeModal.close(this.editedFormula);
  }
}  