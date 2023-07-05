import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {   NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '@features/employee/employee.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Employee } from '@features/employee/employee.model';
import { LeaveStructureService } from '@settings/leave/leave-structure/leave-structure.service';
import { LeaveStructure } from '@settings/leave/leave-structure/leave-structure.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { Shift } from '@settings/attendance/shift/shift.model';
import { WeekOff } from 'src/app/models/common/types/weekoff';
import { HolidayCategoryService } from '@settings/holiday/holiday-category.service';
import { HolidayCategory } from '@settings/holiday/holiday-category.model';
import { EosService } from '@settings/eos/eos.service';
import { EmployeeJobTitle } from '@settings/employee/employee-job-title/employee-job-title.model';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { WorkerType } from 'src/app/models/common/types/workertype';
import { TimeType } from 'src/app/models/common/types/timetype';
import { AttendanceTrackingType } from 'src/app/models/common/types/attendancetrackingtype';
import { PayrollStructureService } from '@settings/payroll/payroll-structure/payroll-structure.service';
import { PayrollStructure } from '@settings/payroll/payroll-structure/payroll-structure.model';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { PayGroup } from '@settings/payroll/pay-group/pay-group.model';
import { OvertimePolicyService } from '@settings/overtime/overtime-policy/overtime-policy.service';
import { OvertimePolicy } from '@settings/overtime/overtime-policy/overtime-policy.model';
import { EmployeeRevisionManagementService } from '../employee-revision-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";
@Component({
  selector: 'hrms-employee-revision-management-edit',
  templateUrl: './employee-revision-management-edit.component.html',
  styleUrls: ['./employee-revision-management-edit.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
      {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class EmployeeRevisionManagementEditComponent implements OnInit {
  editForm: FormGroup;
  minDate:any;
  employeeList:Employee[];
  config;
  searchFailed: boolean;
  selectedDatasource:any;
  config_emp;
  leaveStructureId: LeaveStructure[];
  shiftId: Shift[];
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  holidayCategoryId: HolidayCategory[];
  eosTypes:any[]=[];
  jobTitleId: EmployeeJobTitle[];
  departmentTypeKeys: number[];
  departmentType = DepartmentType;
  workerTypeKeys: number[];
  workerType = WorkerType;
  timeTypeKeys: number[];
  timeType = TimeType;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  payrollStructureId: PayrollStructure[];
  payGroupId: PayGroup[];
  overTimePolicyId: OvertimePolicy[];
  revisionRequest:any=[]
  // @Input() reqId: any;
  selectedDatasource_req:any
  reqId:any
  employeePayrollStructure:any=[]
  employeePayrollStructure_rev:any=[]
  currentUserId:any
  valueObject = {};

 
  constructor(
    // public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private leaveStructureService: LeaveStructureService,
    private toastr: ToasterDisplayService,
    private shiftService: ShiftService,
    private holidayCategoryService: HolidayCategoryService,
    private eosService: EosService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private payrollStructureService: PayrollStructureService,
    private payGroupService: PayGroupService,
    private overtimePolicyService: OvertimePolicyService,
    private EmployeeRevisionManagementService:EmployeeRevisionManagementService,
    private route: ActivatedRoute,
    private router: Router,
    
  ) { 
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.reqId = params['id'];
    });
   
    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select  Requested By",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };

    this.config_emp= {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select  Employee",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };
    this.getEmployeeList()
    this.getLeaveStructure()
    this.getShiftList()
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    this.getHolidayList()
    this.eosService.getAll()
    .subscribe((result) => {
      this.eosTypes = result
    })
    this.getJobList()
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    this.getPayrollStructureList()
    this.getPayGroupList()
    this.getOverTimePolicyList()
    this.getRevisionRequest()
  }

  onSubmit(){

    if(this.editForm.invalid){
      return
    }
    this.editForm.value.employeeId = parseInt(this.editForm.value.employeeId)
   // this.editForm.value.revStatus = 1
    this.editForm.value.departmentId  =parseInt(this.editForm.value.departmentId )
    this.editForm.value.workerType = parseInt( this.editForm.value.workerType)
    this.editForm.value.timeType =parseInt(this.editForm.value.timeType)
    this.editForm.value.leavesStructureId = parseInt( this.editForm.value.leavesStructureId)
    this.editForm.value.shiftId = parseInt(this.editForm.value.shiftId )
    this.editForm.value.weekOff = parseInt(this.editForm.value.weekOff)
    this.editForm.value.holidayCategoryId = parseInt(this.editForm.value.holidayCategoryId)
    this.editForm.value.attendanceTrackingId = parseInt(this.editForm.value.attendanceTrackingId)
    this.editForm.value.payGroupId = parseInt(this.editForm.value.payGroupId)
    this.editForm.value.payrollStructureId = parseInt(this.editForm.value.payrollStructureId)
    this.editForm.value.overTimePolicyId = parseInt( this.editForm.value.overTimePolicyId)
    this.editForm.value.eosId = parseInt( this.editForm.value.eosId)
   // this.editForm.value.refNum =0

   this.editForm.patchValue({
    //employeeRevisionsOldList: this.employeeDetails_old,
    revStatus:1,
    id:this.reqId

  });

    

    this.EmployeeRevisionManagementService.update(this.editForm.value).subscribe((result: any) => {
      this.updateReversedSalaryDetails()
     // this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Update Employee Revision  Request');
      });

  }


  updateReversedSalaryDetails(){
    const details = this.employeeList.find(emp => emp.id === this.currentUserId);
    for(let i=0;i<this.employeePayrollStructure_rev.length;i++){
          // this.employeePayrollStructure_rev[i].id = 0
          this.employeePayrollStructure_rev[i].createdDate =new Date(Date.now())
          this.employeePayrollStructure_rev[i].modifiedDate = new Date(Date.now())
          this.employeePayrollStructure_rev[i].createdBy = details.firstName
          this.employeePayrollStructure_rev[i].modifiedBy =  details.firstName
          this.employeePayrollStructure_rev[i].isArchived = false
          this.employeePayrollStructure_rev[i].employeeRevisionId = this.reqId
          this.employeePayrollStructure_rev[i].payrollStructureId =this.editForm.value.payrollStructureId

    }

    //this.employeePayrollStructure_rev = {...this.employeePayrollStructure_rev}
    this.EmployeeRevisionManagementService.update_ReversedSalaryDetails(this.employeePayrollStructure_rev).subscribe((result: any) => {
      this.toastr.showSuccessMessage('Employee Revision  Request Updated Successfully.');
      this.router.navigate(["/employee-revision-management"])
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Update Employee Salary Revision  Request');
      });  
  }



  getRevisionRequest() {
    debugger
    this.EmployeeRevisionManagementService.get(this.reqId).subscribe(result => {
      this.revisionRequest = result;
      console.log('revdetails',this.revisionRequest)
      this.editForm.patchValue(this.revisionRequest);
      this.editForm.patchValue({
        effectiveFrm: new Date(this.revisionRequest.effectiveFrm),
        reqDate: new Date(this.revisionRequest.reqDate)
      });
      const details = this.employeeList.find(emp => emp.id === this.revisionRequest.employeeId);
      this.selectedDatasource = details.firstName
      const details_req = this.employeeList.find(emp => emp.id === this.revisionRequest.requestedBy);
      this.selectedDatasource_req = details_req.firstName
      this.editForm.get("requestedby").patchValue(details.id);
     this.getEmployeeOldSalaryDetails(this.revisionRequest.id)
     this.getEmployeeReversedSalaryDetails(this.revisionRequest.id)
     // this.getEmployeePayroll(this.revisionRequest.employeeId)
     
    },
      error => {
        console.error(error);
      });
  }

  calculateComponentValues(item,index){

    // if(item.monthlyAmount > item.maximumLimit){
    //   this.employeePayrollStructure_rev.forEach((x)=>{
    //     x.monthlyAmount = ''
    //   })
     
    //   return
    // }
    this.employeePayrollStructure_rev.map((x: any) => {
      this.valueObject[`{${x.shortCode}}`] = x.monthlyAmount;
     })
    
    // this.employeePayrollStructure_rev.map((res, i) => {
    //   const keys = Object.keys(this.valueObject);
    //   if (res.formula) {
    //     let formula: string = res.formula;
    //     keys.forEach((key) => {
    //       formula = formula.replace(key, this.valueObject[key]);
    //     });
    //     formula = formula.replace("[", "");
    //     formula = formula.replace("]", "");
    //     res.monthlyAmount = eval(formula);

    //   }
    // })
    const keys = Object.keys(this.valueObject);
    this.employeePayrollStructure_rev.forEach((x)=>{
      if (x.formula) {
        let formula: string = x.formula;
        keys.forEach((key) => {
          formula = formula.replace(key, this.valueObject[key]);
        });
        formula = formula.replace("[", "");
        formula = formula.replace("]", "");
        x.monthlyAmount = eval(formula).toFixed(2)
        this.valueObject[`{${x.shortCode}}`] = x.monthlyAmount;
      }

    })
  console.log('employeePayrollStructure_rev',this.employeePayrollStructure_rev)
  }

  getEmployeeOldSalaryDetails(id){
  this.employeePayrollStructure=[]
    this.EmployeeRevisionManagementService.get_oldSalaryDetails(id).subscribe(result => {
      this.employeePayrollStructure = result;
      
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee payroll structure.');
      });
  }

  getEmployeeReversedSalaryDetails(id){
    this.employeePayrollStructure_rev=[]
    this.EmployeeRevisionManagementService.get_ReversedSalaryDetails(id).subscribe(result => {
      this.employeePayrollStructure_rev = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee payroll structure.');
      });
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result
     console.log('employee',this.employeeList)
    },
      error => {
        console.error(error);
      });
  }

  getLeaveStructure() {
    this.leaveStructureService.getConfiguredLeaveStructures().subscribe(result => {
      this.leaveStructureId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Structures');
      });
  }

  getShiftList() {
    this.shiftService.getAll().subscribe(result => {
      this.shiftId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the shift lists');
      });
  }

  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      this.holidayCategoryId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the holiday lists');
      });
  }

  onOptionsSelected(){
    debugger
   let item:any= this.eosTypes.filter(el=> this.editForm.get('eosId').value==el.id)
   this.editForm.patchValue({
    bfCode:item[0].bfCode,
    bfName:item[0].bfName
   })   
  }
  getJobList() {
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.jobTitleId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
      });
  }
  getPayrollStructureList() {
    this.payrollStructureService.getConfiguredPayrollStructures().subscribe(result => {
      this.payrollStructureId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll structure lists');
      });
  }
  getPayGroupList() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the pay group lists');
      });
  }
  getOverTimePolicyList() {
    this.overtimePolicyService.getConfiguredOvertimePolicies().subscribe(result => {
      this.overTimePolicyId = result;

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the over time policy lists');
      });
  }

  selectionChanged(args) {
    this.editForm.get("requestedby").patchValue(args.value.id);
  }
  selectionChanged_Employee(args){
    this.editForm.get("employeeId").patchValue(args.value.id);
  }
  search = (text: Observable<string>) => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const searchitem = (this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
        if (searchitem.length == 0) {
          this.searchFailed = true;
          return;
        } else {
          this.searchFailed = false;
          return term.length <= 1 ? [].slice() : this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        }

      })
    );
  }

  // getEmployeePayroll(id) {
  //   this.employeePayrollStructure=[]
  //   this.EmployeeRevisionManagementService.getEmployeePayroll(this.editForm.value.payrollStructureId,id).subscribe(result => {
  //     this.employeePayrollStructure = result;
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.showErrorMessage('Unable to fetch the Employee payroll structure.');
  //     });
  // }


  // print(){
  //   window.print()
  // }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      reqNum: null,
      requestedby: [null, [
        Validators.required
      ]],
      reqDate: [new Date(Date.now()), [
        Validators.required
      ]],
      employeeId: [null, [
        Validators.required,
      ]],
      effectiveFrm: [new Date(Date.now()), [
        Validators.maxLength(250),
      ]],
      revStatus: [null],
      leavesStructureId:['',[Validators.required]],
      shiftId:['',[Validators.required]],
      weekOff:['',[Validators.required]],
      holidayCategoryId:['',[Validators.required]],
      eosId:['',[Validators.required]],
      jobTitleId:['',[Validators.required]],
      departmentId:['',[Validators.required]],
      workerType:['',[Validators.required]],
      timeType:['',[Validators.required]],
      attendanceTrackingId:[null,[Validators.required]],
      payrollStructureId:['',[Validators.required]],
      payGroupId:['',[Validators.required]],
      overTimePolicyId:['',[Validators.required]],
      remark:[''],
      id:[null]
    });
  }

}

