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


@Component({
  selector: 'hrms-payroll-parameter-details-create',
  templateUrl: './payroll-parameter-details-create.component.html',
  styleUrls: ['./payroll-parameter-details-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class PayrollParameterDetailsCreateComponent implements OnInit {
  addForm: FormGroup;
  employeeList;
  config;
  userVariableDetails:any[]
  UserVariableType=UserVariableType;
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
    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select Employee",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };

  }
  selectionChanged(args) {
    this.addForm.get("employeeId").patchValue(args.value.id);
  }
  onChangeEvent(args){ debugger
    let id=this.addForm.get("userVariableId").value
   let selectedItem= this.userVariableDetails.find((item)=>item.id==id)
  // this.variableType=UserVariableType[selectedItem.type]
  // this.addForm.get('variableType').patchValue(UserVariableType[selectedItem.type])
  this.addForm.patchValue({
    type:selectedItem.type, //UserVariableType[selectedItem.type]
    variableTypeName:UserVariableType[selectedItem.type]
  });
  // this.addForm.get('variableType').setValue(UserVariableType[selectedItem.type])
  }

  getEmployeeList() {
    debugger
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
      })
  }
  getUserVariables() {
    debugger
    this.userVariableService.getAll()
      .subscribe((result) => {
        this.userVariableDetails = result
      })
  }

  sendForApproval(){
    if(this.addForm.invalid){
      return
    }
    this.addForm.patchValue({
          status:2
        })

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



  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
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
