import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmpoloyeePayrollReportService } from '../empoloyee-payroll-report.service';
import { ReportsService } from '@features/reports/report.service';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { EmployeeService } from '@features/employee/employee.service';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import download from 'downloadjs';
import * as XLSX from 'xlsx';  

@Component({
  selector: 'hrms-employee-payroll-report-filter',
  templateUrl: './employee-payroll-report-filter.component.html',
  styleUrls: ['./employee-payroll-report-filter.component.scss']
})
export class EmployeePayrollReportFilterComponent implements OnInit {
  addForm: FormGroup;
  payslipYears;
  dropdownList = [];
  selectedItems=[];
  employeeSettings:IDropdownSettings={};
  departmentSettings:IDropdownSettings={};
  designationSettings:IDropdownSettings={};
  monthSettings:IDropdownSettings={};
  designationDetails;
  designation;
  departmentKeys;
  department;
  departmentType = DepartmentType;
  employeeList;
  range = [];
  startYear = new Date().getFullYear();
  selectedPaygroups;
  noOfCalendarDays;
  monthList=[];
  yearList:any=[];
  selectedDepartment;
  selectedDesignation;
  selectedEmployee;
  selectedMonth;
  paygroupId;
  employeeId;
  fromDate;
  ToDate;
  data;
  constructor(
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private empoloyeePayrollReportService:EmpoloyeePayrollReportService,
    private reportService:ReportsService,
    private employeeService: EmployeeService,
    private employeeJobTitleService: EmployeeJobTitleService,

  ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getPayslipYears()
    this.data = [
      { id: 1, name: 'Hanoi' },
      { id: 2, name: 'Lang Son' },
      { id: 3, name: 'Vung Tau' },
      { id: 4, name: 'Hue' },
      { id: 5, name: 'Cu Chi' },
    ];
    // setting and support i18n
    this.monthSettings = {
      idField:'id',
      textField:'name',
      allowSearchFilter: true
    };
    this.getDesignation()
    this.getEmployeeList() 
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
      console.log('this.designationDetails ',this.designationDetails );
      
      this.designationSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      };  
    })
  }
  getPayslipYears(){
    debugger
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
      console.log('monthList =========',this.monthList);

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
      console.log('monthList', this.monthList)
     }) 
  }
onSubmit(){
  debugger
  this.noOfCalendarDays = new Date(this.addForm.get('year').value, this.addForm.get('month').value, 0).getDate();
  this.fromDate= `${this.addForm.get('year').value}-${this.addForm.get('month').value > 9 ? this.addForm.get('month').value : 0 + this.addForm.get('month').value}-01`
  this.ToDate= `${this.addForm.get('year').value}-${this.addForm.get('month').value}-${this.noOfCalendarDays}`
  this.department =null;
  this.designation=null;
  this.employeeId=null;
      if(this.addForm.get('departmentIds').value){
        let departments:any[]=this.addForm.get('departmentIds').value
        let departmentVal=departments.map(({id}) =>id);
        this.department=departmentVal.join();
      }
   
      if(this.addForm.get('designationIds').value){
    let designations:any=[]=this.addForm.get('designationIds').value
    let desigVal=designations.map(({id}) =>id);
    this.designation=desigVal.join()
      }

      if(this.addForm.get('employeeIds').value){
    let employees:any=[]=this.addForm.get('employeeIds').value
    let emp=employees.map(({id}) =>id);
    this.employeeId=emp.join()
      }
    if(this.addForm.invalid){
      return
    }
    this.empoloyeePayrollReportService.previewReport(this.fromDate,this.ToDate,this.designation,this.employeeId,this.department).subscribe((res:any)=>{
  download(atob(res), 'data.xlsx', { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    })
      
    

}
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      fromDate:[null],
      ToDate:[null],
      designationIds:[null],
      employeeIds:[null],
      departmentIds:[null],
      month:[null, [
        Validators.required,
      ]],
      year:[null, [
        Validators.required,
      ]],
    });
  }

}
