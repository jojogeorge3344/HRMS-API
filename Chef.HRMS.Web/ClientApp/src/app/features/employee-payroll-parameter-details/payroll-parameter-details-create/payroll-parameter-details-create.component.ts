import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWpsService } from '@settings/wps/employee-wps.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { result } from 'lodash';
import { PayrollParameterDetailsComponentService } from '../payroll-parameter-details.component.service';
import { PayrollParameterDetails } from '../payroll-parameter-details.model';
import { EmployeeService } from '@features/employee/employee.service';
import { UserVariableService } from '@settings/payroll/user-variable/user-variable-list/user-variable.service';
import { UserVariableType } from '@settings/payroll/user-variable/user-variable.model';
import { Router } from '@angular/router'; 
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";


@Component({
  selector: 'hrms-payroll-parameter-details-create',
  templateUrl: './payroll-parameter-details-create.component.html',
  styleUrls: ['./payroll-parameter-details-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],

})
export class PayrollParameterDetailsCreateComponent implements OnInit {
  addForm: FormGroup;
  employeeList;
  userVariableDetails:any[]
  UserVariableType=UserVariableType;
  userVarObj;
  empObj;
  isLoading=false;
  constructor(   
    private router: Router,
     private route: ActivatedRoute,
     private userVariableService:UserVariableService,
     private payrollParameterDetailsService:PayrollParameterDetailsComponentService,
     private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,

) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getEmployeeList()
    this.getUserVariables()

  }
 
  getEmployeeList() {
    this.isLoading=true
    this.employeeService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, firstName: 'test', isLastRow: true }
        // lastrow
        this.employeeList = [...result, temp];
        this.isLoading=false;
      })
  }
  getUserVariables() {
    this.isLoading=true
    this.userVariableService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.userVariableDetails = [...result, temp];
      this.isLoading=false;
      })
  }

  sendForApproval(){
    debugger
    this.addForm.patchValue({
      status:2
    })

    if(this.addForm.invalid){
      return
    }
    this.payrollParameterDetailsService.add(this.addForm.value).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Employee Payroll Parameter Details Successfully Send For Approval');
        this.router.navigate(['/employee-payroll-parameter-details']);
      } 
    },
      );

  }
  onSubmit() { 
    debugger
    if(this.addForm.get('statusName').value=='pending'){
      this.addForm.patchValue({
        status:1
      })
    }else if(this.addForm.get('statusName').value=='approved'){
      this.addForm.patchValue({
        status:2
      })
    }else{
      this.addForm.patchValue({
        status:3
      })
    }
    if(this.addForm.invalid){
      return
    }
   
    this.addForm.value.employeeId=parseInt(this.addForm.value.employeeId)
    // let apiData=this.addForm.value;
    // delete apiData
    this.payrollParameterDetailsService.add(this.addForm.value).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Employee Payroll Parameter Details Added Successfully');
        this.router.navigate(['/employee-payroll-parameter-details']);
      } 
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Employee Payroll Parameter Details Added Successfully');
      });

  }

  selectUserVariables(args){
    this.addForm.patchValue({
      userVariableId: args.value.id,
      type:args.value.type,
      variableTypeName:UserVariableType[args.value.type]
    })
  }
  selectEmployee(args){
    if(args.value && args.value.id){
      this.addForm.patchValue({
        employeeId: args.value.id
      })
    }else{
      this.addForm.patchValue({
        employeeId: 0
      })  
    }
  }
  refreshUserVariables(event){
    event.stopPropagation();
    event.preventDefault();
    this.getUserVariables();
  }
  refreshEmployee(event){
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeList();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [0],
      userVariableId: [null, [
        Validators.required
      ]],
      type: ['', [
        Validators.required,        
      ]],
      transDate: ['', [
        Validators.required
      ]],
      transValue: ['',[
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      variableTypeName:[''],
      statusName:['pending'],
      remarks: [''],
    });
  }

}
