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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service'; 
import { LeaveComponentService } from '@settings/leave/leave-component/leave-component.service';
import { EmployeeJobDetailsService } from '@features/employee/employee-job-details/employee-job-details.service';
import { BranchService } from '@settings/branch/branch.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-leave-details-report-filter',
  templateUrl: './leave-details-report-filter.component.html',
  styleUrls: ['./leave-details-report-filter.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class LeaveDetailsReportFilterComponent implements OnInit {
  addForm: FormGroup;
  dropdownList = [];
  selectedItems=[];
  paygroupSettings:IDropdownSettings={};
  employeeSettings:IDropdownSettings={};
  departmentSettings:IDropdownSettings={};
  designationSettings:IDropdownSettings={};
  employeeGroupSettings:IDropdownSettings={};
  leaveSettings:IDropdownSettings={};
  locationSettings:IDropdownSettings={};
  payGroupDetails;
  designationDetails;
  designationIds;
  departmentKeys;
  departmentIds;
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
  paygroupIds;
  employeeIds;
  fromDate;
  ToDate;
  payslipYears;
  selectedEmployeeGroup;
  employeeGroupdetails;
  selectLeaveComponent;
  leaveComponents;
  groupCategory;
  location;
  selectedLocation;
  locationIds;
  employeeCategory;
  leaveComponentIds;
  reportType;

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
    private leaveComponentService: LeaveComponentService,
    private employeeJobDetailsService: EmployeeJobDetailsService,
    private branchService: BranchService,

  ) { }


  ngOnInit(): void {
    this.getPayslipYears()
    this.getPayGroup()
    this.getDesignation()
    this.getEmployeeList() 
    this.getAllLeaveComponents()
    this.getEmployeeCategory()
    this.getBranches()
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
  getAllLeaveComponents() {
    this.leaveComponentService.getAll().subscribe(
      (res) => {
        this.leaveComponents = res;
        this.leaveSettings={
          idField:'id',
          textField:'name',
          allowSearchFilter: true  
        }
      },
    );
  }
  getEmployeeCategory(){
    this.employeeJobDetailsService.getCategory().subscribe((result)=>{      
      this.groupCategory=result;  
      this.employeeGroupSettings={
          idField:'id',
          textField:'name',
          allowSearchFilter: true    
    }
  },
  );
}
getBranches() {
  this.branchService.getAll().subscribe(result => {
    // lastrow
    this.location = result
    this.locationSettings = {
      idField:'id',
      textField:'shortName',
      allowSearchFilter: true
    };  
  },
 );
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
  summaryChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isDetails:false,
        reportType:'Summary'
      })
     
    }
  }
  detailChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isSummary:false,
        reportType:'Detailed'
      })
     
    }
  }
  getPaySlipYear(){

  }
  openPrint() {
    let selectedIds=this.selectedPaygroups
    let arrValue = selectedIds?.map(({id}) =>id);
    this.paygroupIds = arrValue?.join()

    let departments=this.selectedDepartment
    let departmentVal=departments?.map(({id}) =>id);
    this.departmentIds=departmentVal?.join()

    let designations=this.selectedDesignation
    let desigVal=designations?.map(({id}) =>id);
    this.designationIds=desigVal?.join()

    let employees=this.selectedEmployee;
    let emp=employees?.map(({id}) =>id);
    this.employeeIds=emp?.join()

    let location=this.selectedLocation;
    let loc=location?.map(({id}) =>id);
    this.locationIds=loc?.join()

    let empCategory=this.selectedEmployeeGroup;
    let category=empCategory?.map(({id}) =>id);
    this.employeeCategory=category?.join()

    let leaveComp=this.selectLeaveComponent;
    let leav=leaveComp?.map(({id}) =>id);
    this.leaveComponentIds=leav?.join()


  //   this.noOfCalendarDays = new Date(this.addForm.get('year').value, this.addForm.get('month').value, 0).getDate();
   this.fromDate= this.addForm.get('fromDate').value
   this.ToDate= this.addForm.get('ToDate').value
  this.reportType=this.addForm.get('reportType').value
  
   this.reportService.setOption( this.reportType,this.paygroupIds,
    this.departmentIds,
    this.designationIds,
    this.employeeIds,
    this.locationIds,this.employeeCategory,this.leaveComponentIds,this.fromDate,this.ToDate)
  

    this.router.navigate(["./leavedetails/print"], {
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
      reportType:[null, [
        Validators.required,
      ]],
      isSummary:[null],
      isDetails:[null],
      paygroupIds:[null],
      designationIds:[null,],
      employeeIds:[null],
      leaveComponentIds:[null],
      departmentIds:[null],
      employeeCategory:[null],
      locationIds:[null ],
    });
  }
}
