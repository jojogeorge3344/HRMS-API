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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'hrms-payroll-parameter-details-edit',
  templateUrl: './payroll-parameter-details-edit.component.html',
  styleUrls: ['./payroll-parameter-details-edit.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollParameterDetailsEditComponent implements OnInit {

  editForm: FormGroup;
  employeeList;
  userVariableDetails;
  UserVariableType = UserVariableType;
  reqId: any;
  selectedDatasource;
  payrollParameterDetailsItem;
  empObj;
  userVarObj;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payrollParameterDetailsService: PayrollParameterDetailsComponentService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private userVariableService: UserVariableService,

  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.reqId = params['id'];
    });
    this.fillDropDowns()
    debugger
    //   this.selectedDatasource=this.employeeList.filter((item)=>{
    //  this.payrollParameterDetailsItem.employeeId==item.id
    //   })
    // this.payrollParameterDetailsItem.transDate = new Date(this.payrollParameterDetailsItem.transDate);    
  }



  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, firstName: 'test', isLastRow: true }
        // lastrow
        this.employeeList = [...result, temp];
      })
  }
  getUserVariables() {
    this.userVariableService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, name: 'test', isLastRow: true }
        // lastrow
        this.userVariableDetails = [...result, temp];
      })
  }

  sendForApproval() {
    if (this.editForm.invalid) {
      return
    }
    this.editForm.patchValue({
      status: 2
    })
    let apiData = this.editForm.value;
    this.payrollParameterDetailsService.update(apiData).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Employee Payroll Parameter Details Successfully Send For Approval');
        this.router.navigate(['/employee-payroll-parameter-details']);
      }
    },
    );

  }
  onSubmit() {
    debugger
    if (this.editForm.get('statusName').value == 'pending') {
      this.editForm.patchValue({
        status: 1
      })
    } else if (this.editForm.get('statusName').value == 'Approved') {
      this.editForm.patchValue({
        status: 2
      })
    } else  {
      this.editForm.patchValue({
        status: 3
      })
    }
    // let apiData=this.addForm.value;
    // delete apiData
    this.editForm.patchValue({
      id: this.payrollParameterDetailsItem.id
    });
    let apiData = this.editForm.value;
    this.payrollParameterDetailsService.update(apiData).subscribe((result) => {
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
      if (this.payrollParameterDetailsItem.status == 1) {
        this.editForm.patchValue({
          statusName: 'pending',
        })
      } else if (this.payrollParameterDetailsItem.status == 2) {
        this.editForm.patchValue({
          statusName: 'Approved',
        })
      } else {
        this.editForm.patchValue({
          statusName: 'processed',
        })
      }

      console.log('VALUE', this.payrollParameterDetailsItem)
      debugger
      this.editForm.patchValue({
        id: this.payrollParameterDetailsItem.id,
        // employeeId:this.payrollParameterDetailsItem.employeeId,
        userVariableId: this.payrollParameterDetailsItem.userVariableId,
        variableTypeName: UserVariableType[this.payrollParameterDetailsItem.type],
        transDate: new Date(this.payrollParameterDetailsItem.transDate),
        transValue: this.payrollParameterDetailsItem.transValue,
        type: this.payrollParameterDetailsItem.type,
        status: this.payrollParameterDetailsItem.status,
        remarks: this.payrollParameterDetailsItem.remarks,
        employeeId: this.payrollParameterDetailsItem.employeeId
      });
      this.empObj = this.employeeList.find((item) => this.editForm.get('employeeId').value == item.id)
      this.userVarObj = this.userVariableDetails.find((item) => this.editForm.get('userVariableId').value == item.id)

      // let details: any = null;
      // this.employeeList.forEach((emp) => {
      //   if ((result.employeeId == emp.id)) {
      //     details = emp;
      //   }
      // });

      // this.editForm.patchValue({ employeeId: details });
      this.editForm.patchValue({ transDate: new Date(this.payrollParameterDetailsItem.transDate) })
    },

      error => {

        console.error(error);

      });

  }
  selectUserVariables(args) {
    this.editForm.patchValue({
      userVariableId: args.value.id,
      type: args.value.type,
      variableTypeName: UserVariableType[args.value.type]
    })
  }
  selectEmployee(args) {
    if (args.value && args.value.id) {
      this.editForm.patchValue({
        employeeId: args.value.id
      })
    } else {
      this.editForm.patchValue({
        employeeId: 0
      })
    }
  }
  refreshUserVariables(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getUserVariables();
  }
  refreshEmployee(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeList();
  }

  fillDropDowns() {
    debugger
    forkJoin([
      this.employeeService.getAll(),
      this.userVariableService.getAll()
    ]).subscribe(res => {
      let temp = { id: undefined, firstName: 'test', name: 'test', isLastRow: true };
      this.employeeList = [...res[0], temp];
      this.userVariableDetails = [...res[1], temp];
      this.getItemById();
    })
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
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
