import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
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
import { BranchService } from '@settings/branch/branch.service';
import { OvertimePolicyService } from '@settings/overtime/overtime-policy/overtime-policy.service';
import { formatDate, DatePipe } from "@angular/common";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-employee-overtime-report',
  templateUrl: './employee-overtime-report.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
  styleUrls: ['./employee-overtime-report.component.scss']
})
export class EmployeeOvertimeReportComponent implements OnInit {

  addForm: FormGroup;
  dropdownList = [];
  selectedItems=[];
  paygroupSettings:IDropdownSettings={};
  employeeSettings:IDropdownSettings={};
  departmentSettings:IDropdownSettings={};
  designationSettings:IDropdownSettings={};
  employeeGroupSettings:IDropdownSettings={};
  locationSettings:IDropdownSettings={};
  overtimeSettings:IDropdownSettings={};
  payGroupDetails;
  designationDetails;
  DesignationName;
  departmentKeys;
  Department;
  LocationName;
  departmentTypeKeys: number[];
  departmentType = DepartmentType;
  employeeList;
  range = [];
  selectedPaygroups:any[] = [];
  noOfCalendarDays;
  selectedDepartment;
  selectedLocation;
  selectedDesignation;
  selectedEmployee;
  selectedEmployeeGroup
  employeeGroup
  PaygroupName;
  EmployeeFullName;
  fromDate;
  ToDate;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  employeeGroupdetails:any
  locationList: any;
  OvertimeDetails=[]
  overtimePolicies:any
  selectedOvertime
  OverTimePolicyName
  overtimeAllDetails: any;
  isAllSelect: boolean=false;
  
  
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
    private branchService: BranchService,
    private overtimePolicyService: OvertimePolicyService,

  ) {
    const date = new Date();
    this.minDate = {
      year: date.getFullYear()-1,
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: date.getFullYear() ,
      month: 12,
      day: 31
    };
   }


  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getPayGroup()
    this.getDesignation()
    this.getEmployeeList() 
    this.getGroupCategory()
    this.getLocation()
    this.getOvertimePolicies()
  
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
    this.overtimeAllDetails=[]
    // this. overtimeAllDetails=this.reportService.setOvertime()
    if(this.overtimeAllDetails){
      setTimeout(()=>{
        this.addForm.patchValue({
          FromDate:new Date(this.overtimeAllDetails[0].fromDate),
          ToDate:new Date(this.overtimeAllDetails[0].ToDate),
          Department:[...this.overtimeAllDetails[0].Department],
          ReportType:this.overtimeAllDetails[0].reportType,
          NormalOverTimeHrs:this.overtimeAllDetails[0].normalOT,
          HolidayOverTimeHrs:this.overtimeAllDetails[0].holidayOT,
          SpecialOverTimeHrs:this.overtimeAllDetails[0].specialOT,
         })
      },100)
      console.log(this.addForm.value)
    }
    
  }

  getPayGroup() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupDetails = result;
      if(this.overtimeAllDetails){
      setTimeout(() => {
        this.addForm.patchValue({
          PaygroupName:[...this.overtimeAllDetails[0].PaygroupName]
        });
      }, 100);
      }
    
      this.paygroupSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      };      
    })
  }

  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result

        if(this.overtimeAllDetails){
          setTimeout(() => {
            this.addForm.patchValue({
              EmployeeFullName:[...this.overtimeAllDetails[0].EmployeeFullName]
            });
          }, 100);
          }
        this.employeeSettings = {
          idField:'id',
          textField:'firstName',
          allowSearchFilter: true
        }; 
      })
  }
  onChange(args){
   let obj= this.addForm.get('myItems').value
  }
  getDesignation() {
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.designationDetails = result;
      this.designationSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      };  

      if(this.overtimeAllDetails){
        setTimeout(() => {
          this.addForm.patchValue({
            DesignationName:[...this.overtimeAllDetails[0].DesignationName]
          });
        }, 100);
        }
    })
  }

  openPrint() {
    if(this.addForm.value.FromDate!=null && this.addForm.value.ToDate!=null && this.addForm.value.PaygroupName==null && this.addForm.value.DesignationName==null &&
      this.addForm.value.LocationName==null && this.addForm.value.Department==null && this.addForm.value.employeeGroup==null && this.addForm.value.EmployeeFullName==null && this.addForm.value.OverTimePolicyName==null){
      this.isAllSelect=true
      }else{
        this.isAllSelect=false
      }
    this.PaygroupName = this.addForm.value.PaygroupName;
    this.DesignationName=this.addForm.value.DesignationName
    this.LocationName=this.addForm.value.LocationName
    this.Department=this.addForm.value.Department
    this.employeeGroup=this.addForm.value.employeeGroup
    this.EmployeeFullName=this.addForm.value.EmployeeFullName
    this.OverTimePolicyName=this.addForm.value.OverTimePolicyName
    this.addForm.value.FromDate= formatDate(this.addForm.value.FromDate, 'yyyy-MM-ddT00:00:00', 'en-Us');
    this.addForm.value.ToDate  = formatDate(this.addForm.value.ToDate, 'yyyy-MM-ddT00:00:00', 'en-Us');

    this.OvertimeDetails.push({
      PaygroupName:this.PaygroupName,
      DesignationName:this.DesignationName,
      LocationName:this.LocationName,
      Department:this.Department,
      employeeGroup:this.employeeGroup,
      EmployeeFullName:this.EmployeeFullName,
      overtimeName:this.OverTimePolicyName,
      fromDate:this.addForm.value.FromDate,
      ToDate:this.addForm.value.ToDate,
      reportType:this.addForm.value.ReportType,
      normalOT:this.addForm.value.NormalOverTimeHrs,
      holidayOT:this.addForm.value.HolidayOverTimeHrs,
      specialOT:this.addForm.value.SpecialOverTimeHrs,
      isAllSelect:this.isAllSelect

    }
    )
    this.reportService.getOvertime(this.OvertimeDetails)

  if(this.addForm.valid)
  this.router.navigate(["./employeeovertimelist/print"], {
    
    relativeTo: this.route.parent,
   
   });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      FromDate:[null, [ 
        Validators.required,
      ]],
      ToDate:[null, [
        Validators.required,
      ]],
      PaygroupName:[null],
      DesignationName:[null],
      EmployeeFullName:[null],
      Department:[null],
      LocationName:[null],
      employeeGroup:[null],
      ReportType:[null, [
        Validators.required,
      ]],
      OverTimePolicyName:[null],
      NormalOverTimeHrs:[false,],
      HolidayOverTimeHrs:[false,],
      SpecialOverTimeHrs:[false,],
      isSummary:[false],
      isDetails:[false],
      isAllSelect:[false]
    });
  }
  getGroupCategory() {
    this.reportService.getCategory().subscribe((result: any) => {
      this.employeeGroupdetails = result;
      if(this.overtimeAllDetails){
        setTimeout(() => {
          this.addForm.patchValue({
            employeeGroup:[...this.overtimeAllDetails[0].employeeGroup]
          });
        }, 100);
        }
      this.employeeGroupSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      }; 
    })

  
  }
  getLocation() {
    this.branchService.getAll().subscribe(result => {
      this.locationList= result
      this.locationSettings = {
        idField:'id',
        textField:'shortName',
        allowSearchFilter: true
      }; 

      if(this.overtimeAllDetails){
        setTimeout(() => {
          this.addForm.patchValue({
            LocationName:[...this.overtimeAllDetails[0].LocationName]
          });
        }, 100);
        }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the LocationName');
      });
  }
  summaryChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isDetails:false,
        ReportType:'Summary'
      })
    }

  }
  detailsChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isSummary:false,
        ReportType:'Detailed'
      })
    }
  }
  getOvertimePolicies() {
    this.overtimePolicyService.getAllAssignedOverTimePolicyCount().subscribe((result) => {
      this.overtimePolicies = result;
      this.overtimeSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      }; 
      if(this.overtimeAllDetails){
        setTimeout(() => {
          this.addForm.patchValue({
            OverTimePolicyName:[...this.overtimeAllDetails[0].overtimeName]
          });
        }, 100);
        }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the overtime policies');
    });
  }
}






