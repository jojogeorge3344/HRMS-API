import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { result } from 'lodash';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { DepartmentType } from '../../../../models/common/types/departmenttype';
import { EmployeeService } from '@features/employee/employee.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'hrms-employee-payslip-print-filter',
  templateUrl: './employee-payslip-print-filter.component.html',
  styleUrls: ['./employee-payslip-print-filter.component.scss']
})
export class EmployeePayslipPrintFilterComponent implements OnInit {
  addForm: FormGroup;
  dropdownList = [];
  selectedItems=[];
  paygroupSettings:IDropdownSettings={};
  employeeSettings:IDropdownSettings={};
  departmentSettings:IDropdownSettings={};
  designationSettings:IDropdownSettings={};
  payGroupDetails;
  designation;
  department;
  departmentTypeKeys: number[];
  departmentType = DepartmentType;
  employeeList;
  
  // selectedSourceLibs: any = [];
  selected = [{ id: 3, name: "Volkswagen Ford" }];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private payGroupService: PayGroupService,
    private employeeJobTitleService: EmployeeJobTitleService
  ) { }

  ngOnInit(): void {
    this.getPayGroup()
    this.getDesignation()
    this.getEmployeeList() 
    this.addForm = this.createFormGroup();
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);

    this.department = [
      { idField: 1, textField: 'Engineering' },
      { idField: 2, textField: 'HumanResource' },
      { idField: 3, textField: 'Marketing' },
    ];
    this.departmentSettings = {
      idField: 'idField',
      textField: 'textField',
    }; 
  }

  getPayGroup() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupDetails = result;
      
      this.paygroupSettings = {
        idField: 'id',
        textField: 'name',
      };      
    })
  }
  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
        this.employeeSettings = {
          idField: 'id',
          textField: 'firstName',
        }; 
      })
  }
  onChangeEvent(args){
    debugger
   let obj= this.addForm.get('myItems').value
  }
  getDesignation() {
    debugger
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.designation = result;
      this.designationSettings = {
        idField: 'id',
        textField: 'name',
      };  
    })
  }
  getPaySlipYear(){

  }
  openPrint() {
    debugger
    this.router.navigate(["./print/"  ], {
      relativeTo: this.route.parent,
  })
    }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      myItems: [null, [
      ]],
      fromDate:[null, [
      ]],
      ToDate:[null, [
      ]],
      paygroupId:[null, [
      ]],
      designation:[null, [
      ]],
      employeeId:[null, [
      ]],
      department:[null, [
      ]],
    });
  }

}
