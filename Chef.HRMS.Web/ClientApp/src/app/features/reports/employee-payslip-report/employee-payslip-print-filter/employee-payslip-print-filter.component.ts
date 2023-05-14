import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { result } from 'lodash';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { DepartmentType } from '../../../../models/common/types/departmenttype';
import { EmployeeService } from '@features/employee/employee.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ReportsService } from '@features/reports/report.service';
import { ReportViewerService } from '@shared/report-viewer/report-viewer.service';
import { EmployeePayslipPrintComponent } from '../employee-payslip-print/employee-payslip-print.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

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
  designationDetails;
  designation;
  departmentKeys;
  department;
  departmentTypeKeys: number[];
  departmentType = DepartmentType;
  employeeList;
  range = [];
  startYear = new Date().getFullYear();
  selectedPaygroups;
  noOfCalendarDays;
  monthList;
  yearList;
  selectedDepartment;
  selectedDesignation;
  selectedEmployee;
  paygroupId;
  employeeId;
  fromDate;
  ToDate;
  // selectedSourceLibs: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private payGroupService: PayGroupService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private reportService:ReportsService,
    private reportViewerService: ReportViewerService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,

  ) { }


  ngOnInit(): void {
    this.getPayGroup()
    this.getDesignation()
    this.getEmployeeList() 
    this.getPayslipYears()
    this.addForm = this.createFormGroup();
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);

    this.departmentKeys = [
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'HumanResource' },
      { id: 3, name: 'Marketing' },
    ];

    this.departmentSettings = {
      idField: 'id',
      textField: 'name',
    }; 

    this.monthList=[
      { id: 1, name: 'January' },
      { id: 2, name: 'February' },
      { id: 3, name: 'March' },
      { id: 4, name: 'April' },
      { id: 5, name: 'May' },
      { id: 6, name: 'June' },
      { id: 7, name: 'July' },
      { id: 8, name: 'August' },
      { id: 9, name: 'September' },
      { id: 10, name: 'October' },
      { id: 11, name: 'November' },
      { id: 12, name: 'December' },
    ];
    this.yearList=[
      { id: 1, name: '2023' },
      { id: 2, name: '2022' },
      { id: 3, name: '2021' },
      { id: 4, name: '2020' },
      { id: 5, name: '2019' },
      { id: 6, name: '2018' },
      { id: 7, name: '2017' },
      { id: 8, name: '2016' },
      { id: 9, name: '2015' },
      { id: 10, name: '2014' },
      { id: 11, name: '2013' },
      { id: 12, name: '2012' },
    ];
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
  getPayslipYears(){
    this.reportService.getPaysipYears().subscribe(result=>{
     this.yearList=result
     
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
  onChange(args){
    debugger
   let obj= this.addForm.get('myItems').value
  }
  getDesignation() {
    debugger
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.designationDetails = result;
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
    let selectedIds=this.selectedPaygroups
    this.paygroupId = selectedIds.map(({ id }) => id);
    let departments=this.selectedDepartment
    this.department=departments.map(({ id }) => id);
    let designations=this.selectedDesignation
    this.designation=designations.map(({ id }) => id);
    let employees=this.selectedEmployee
    this.employeeId=employees.map(({ id }) => id);
    this.noOfCalendarDays = new Date(this.addForm.get('year').value, this.addForm.get('month').value, 0).getDate();
   this.fromDate= `${this.addForm.get('year').value}-${this.addForm.get('month').value > 9 ? this.addForm.get('month').value : 0 + this.addForm.get('month').value}-01`
   this.ToDate= `${this.addForm.get('year').value}-${this.addForm.get('month').value}-${this.noOfCalendarDays}`

   const modalRef = this.modalService.open(EmployeePayslipPrintComponent,
    { size: 'lg', centered: true, backdrop: 'static' });
  modalRef.componentInstance.paygroupId = this.paygroupId;
  modalRef.componentInstance.department = this.department;
  modalRef.componentInstance.designation = this.designation;
  modalRef.componentInstance.employeeId = this.employeeId;
  modalRef.componentInstance.fromDate = this.fromDate;
  modalRef.componentInstance.ToDate = this.ToDate;

 
    // this.reportViewerService.customData.paygroupId = paygroupId;
    // this.reportViewerService.customData.department = department;
    // this.reportViewerService.customData.designation = designation;
    // this.reportViewerService.customData.employeeId = employeeId;
    // this.reportViewerService.customData.fromDate = fromDate;
    // this.reportViewerService.customData.ToDate = ToDate;

    this.router.navigate(["./print/"  ], {
      relativeTo: this.route.parent,
  })
    }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      fromDate:[null, [ 
        Validators.required,
      ]],
      ToDate:[null, [
        Validators.required,
      ]],
      paygroupId:[null, [
        Validators.required,
      ]],
      designation:[null, [
        Validators.required,
      ]],
      employeeId:[null, [
        Validators.required,
      ]],
      department:[null, [
        Validators.required,
      ]],
      month:[null, [
        Validators.required,
      ]],
      year:[null, [
        Validators.required,
      ]],
    });
  }

}
