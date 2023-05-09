import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWpsService } from '@settings/wps/employee-wps.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { result } from 'lodash';
import { PayrollParameterDetailsComponentService } from '../payroll-parameter-details.component.service';
import { PayrollParameterDetails } from '../payroll-parameter-details.model';
import { EmployeeService } from '@features/employee/employee.service';
import { UserVariableService } from '@settings/payroll/user-variable/user-variable-list/user-variable.service';
import { UserVariableType } from '@settings/payroll/user-variable/user-variable.model';


@Component({
  selector: 'hrms-payroll-parameter-details-create',
  templateUrl: './payroll-parameter-details-create.component.html',
  styleUrls: ['./payroll-parameter-details-create.component.scss']
})
export class PayrollParameterDetailsCreateComponent implements OnInit {
  addForm: FormGroup;
  employeeList;
  config;
  userVariableDetails:any[]
  userVariableTypeOf = UserVariableType;

  constructor(   
     private route: ActivatedRoute,
     private userVariableService:UserVariableService,
     private payrollParameterDetails:PayrollParameterDetailsComponentService,
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
  onChangeEvent(e){
    debugger
  console.log(e.target.value);
  
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

  onSubmit() {

    // this.employeeNumbersService.add(this.addForm.value).subscribe((result: EmployeeNumbers) => {
    //   if (result.id === -1) {
    //     this.toastr.showErrorMessage('Employee Series already exists!');
    //   } else {
    //     this.toastr.showSuccessMessage('Employee Series added successfully!');
    //     this.activeModal.close('submit');
    //   }
    // },
    //   error => {
    //     console.error(error);
    //     this.toastr.showErrorMessage('Unable to add the Employee Series');
    //   });

  }



  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
      userVariableId: [null, [
        Validators.required
      ]],
      VariableType: ['', [
        Validators.required,        
      ]],
      date: ['', [
        Validators.required
      ]],
      values: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      remarks: ['', [
        Validators.required
      ]],
    });
  }

}
