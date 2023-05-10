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
  selector: 'hrms-payroll-parameter-details-edit',
  templateUrl: './payroll-parameter-details-edit.component.html',
  styleUrls: ['./payroll-parameter-details-edit.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollParameterDetailsEditComponent implements OnInit {

  editForm: FormGroup;
  employeeList;
  config;
  userVariableDetails;
  UserVariableType = UserVariableType;
  reqId: any;
  selectedDatasource;
  payrollParameterDetailsItem;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payrollParameterDetailsService: PayrollParameterDetailsComponentService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private userVariableService:UserVariableService,

  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.reqId = params['id'];
    });
    this.getItemById()
    this.getEmployeeList()
    this.getUserVariables()
    debugger
  //   this.selectedDatasource=this.employeeList.filter((item)=>{
  //  this.payrollParameterDetailsItem.employeeId==item.id
  //   })
  this.payrollParameterDetailsItem.transDate = new Date(this.payrollParameterDetailsItem.transDate);    

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
    this.editForm.get("employeeId").patchValue(args.value.id);
  }
  onChangeEvent(args) {
    debugger
    let id = this.editForm.get("userVariableId").value
    let selectedItem = this.userVariableDetails.find((item) => item.id == id)
    // this.variableType=UserVariableType[selectedItem.type]
    // this.addForm.get('variableType').patchValue(UserVariableType[selectedItem.type])
    this.editForm.patchValue({
      type: selectedItem.type, //UserVariableType[selectedItem.type]
      variableTypeName: UserVariableType[selectedItem.type]
    });
    // this.addForm.get('type').setValue(UserVariableType[selectedItem.type])
  }

  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
      })
  }
  getUserVariables() {
    this.userVariableService.getAll()
      .subscribe((result) => {
        this.userVariableDetails = result
      })
  }

  sendForApproval() {

  }
  onSubmit() {
    debugger
    if (this.editForm.get('statusName').value == 'pending') {
      this.editForm.patchValue({
        status: 1
      })
    } else if (this.editForm.get('statusName').value == 'approved') {
      this.editForm.patchValue({
        status: 2
      })
    } else {
      this.editForm.patchValue({
        status: 3
      })
    }
    // let apiData=this.addForm.value;
    // delete apiData
    debugger
    this.editForm.patchValue({
      id: this.payrollParameterDetailsItem.id
    });

    this.payrollParameterDetailsService.update(this.editForm.value).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Employee Payroll Parameter Details updated Successfully');
        this.router.navigate(['/employee-payroll-parameter-details']);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Update the Employee Payroll Parameter Details');
      });

  }

  getItemById() {
    debugger
    this.payrollParameterDetailsService.get(this.reqId).subscribe(result => {
      
    this.payrollParameterDetailsItem = result;
    
    this.editForm.patchValue(this.payrollParameterDetailsItem);
    let id = this.editForm.get("userVariableId").value
    debugger
    this.editForm.patchValue({
      variableTypeName: UserVariableType[this.payrollParameterDetailsItem.type]
    });
    this.editForm.patchValue({  transDate:new Date(this.payrollParameterDetailsItem.transDate)})
    
   const details = this.employeeList.find((emp) =>{ this.userVariableDetails.employeeId ==emp.id} );
    this.selectedDatasource = details.firstName
    },
    
     error => {
    
    console.error(error);
    
    });
    
    }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id:[null],
      employeeId: [''],
      userVariableId: [null, [
        Validators.required
      ]],
      type: ['', [
        Validators.required,
      ]],
      transDate: [null, [
        Validators.required
      ]],
      transValue: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      variableTypeName: [''],
      statusName: ['pending'],
      remarks: [''],
    });
  }

}
