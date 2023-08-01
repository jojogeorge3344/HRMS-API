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
  payslipYears;
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
    this.getPayslipYears()
    this.getPayGroup()
    this.getDesignation()
    this.getEmployeeList() 
    this.addForm = this.createFormGroup();
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);

    this.departmentKeys = [
      { id:1, name: 'Engineering' },
      { id:2, name: 'HumanResource' },
      { id:3, name: 'Marketing' },
    ];

    this.departmentSettings = {
      idField:'id',
      textField:'name',
      allowSearchFilter: true
    }; 
  }

  getPayGroup() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupDetails = result;
      
      this.paygroupSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      };      
    })
  }
  getPayslipYears(){
    var monthNames = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    this.reportService.getPaysipYears().subscribe(result=>{
      this.payslipYears=result 
      
      console.log('payslip year',this.payslipYears);
      let montharr=[]
      let yeararr=[]
      for(let i=0;i<this.payslipYears.length;i++){
        var date = new Date(this.payslipYears[i].payrollProcessDate) 
        var month = date.getMonth()
        var year=date.getFullYear()
        montharr.push({id: month+1,name: monthNames[month],monthNumber:month+1,})
        yeararr. push({id: i+1,name: year})
      }

      let uniqueMonth=new Map();
      let uniqueyear=new Map()
      yeararr.forEach(ele=>{
        uniqueyear.set(ele.name,ele.name)
      });
    this.yearList=[...uniqueyear.values()]
      montharr.forEach(ele=>{
        uniqueMonth.set(ele.name,{monthName:ele.name,monthNumber:ele.monthNumber})
      });
      this.monthList = [...uniqueMonth.values()] ;
     }) 
  }
  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
        this.employeeSettings = {
          idField:'id',
          textField:'firstName',
          allowSearchFilter: true
        }; 
      })
  }
  getDesignation() {
    debugger
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.designationDetails = result;
      this.designationSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      };  
    })
  }
  getPaySlipYear(){

  }
  openPrint() {
    debugger
    let selectedIds=this.selectedPaygroups
    let arrValue = selectedIds?.map(({id}) =>id);
    this.paygroupId = arrValue?.join()

    let departments=this.selectedDepartment
    let departmentVal=departments?.map(({id}) =>id);
    this.department=departmentVal?.join()

    let designations=this.selectedDesignation
    let desigVal=designations?.map(({id}) =>id);
    this.designation=desigVal?.join()

    let employees=this.selectedEmployee;
    let emp=employees?.map(({id}) =>id);
    this.employeeId=emp?.join()

    this.noOfCalendarDays = new Date(this.addForm.get('year').value, this.addForm.get('month').value, 0).getDate();
   this.fromDate= `${this.addForm.get('year').value}-${this.addForm.get('month').value > 9 ? this.addForm.get('month').value : 0 + this.addForm.get('month').value}-01`
   this.ToDate= `${this.addForm.get('year').value}-${this.addForm.get('month').value}-${this.noOfCalendarDays}`

  //  const modalRef = this.modalService.open(EmployeePayslipPrintComponent,
  //   { size: 'xl', centered: true, backdrop: 'static' });
  // modalRef.componentInstance.paygroupId = this.paygroupId;
  // modalRef.componentInstance.department = this.department;
  // modalRef.componentInstance.designation = this.designation;
  // modalRef.componentInstance.employeeId = this.employeeId;
  // modalRef.componentInstance.fromDate = this.fromDate;
  // modalRef.componentInstance.ToDate = this.ToDate;

 
  //   // this.reportViewerService.customData.paygroupId = paygroupId;
  //   // this.reportViewerService.customData.department = department;
  //   // this.reportViewerService.customData.designation = designation;
  //   // this.reportViewerService.customData.employeeId = employeeId;
  //   // this.reportViewerService.customData.fromDate = fromDate;
  //   // this.reportViewerService.customData.ToDate = ToDate;

  //   this.router.navigate(["./print/"  ], {
  //     relativeTo: this.route.parent,
  // })

  this.reportService.setPaySlip(this.paygroupId,this.department,this.designation,this.employeeId,this.fromDate,this.ToDate)
if(this.addForm.valid)
  this.router.navigate(["./employeepayslip/print"], {
  
     relativeTo: this.route.parent,
 
  });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      fromDate:[null],
      ToDate:[null],
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
