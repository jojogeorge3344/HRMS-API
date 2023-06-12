import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {   NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { PayrollCalculationService } from '@settings/payroll/payroll-calculation/payroll-calculation.service';
@Component({
  selector: 'hrms-employee-revision-management-create',
  templateUrl: './employee-revision-management-create.component.html',
  styleUrls: ['./employee-revision-management-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeRevisionManagementCreateComponent implements OnInit {
  addForm: FormGroup;
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
  employeeDetails:any=[]
  currentUserId:any
  employeePayrollStructure:any=[]
  employeeDetails_old:any={}
  employeePayrollStructure_rev:any=[]
  employeeRevisionId:any
  employeeSalaryRevId:any
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
    public modalService: NgbModal,
    private payrollCalculationService: PayrollCalculationService,
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
    this.addForm = this.createFormGroup();
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
    // this.getLeaveStructure()
    // this.getShiftList()
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    // this.getHolidayList()
   
    // this.getJobList()
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    // this.getPayrollStructureList()
    // this.getPayGroupList()
    // this.getOverTimePolicyList()
   // this.addForm.get("requestedby").patchValue(this.currentUserId);
   
    
  }

  onSubmit(){
    debugger
    if(this.addForm.invalid){
      return
    }
    debugger
    this.addForm.value.employeeId = parseInt(this.addForm.value.employeeId)
    // this.addForm.value.revStatus = 1
    this.addForm.value.departmentId  =parseInt(this.addForm.value.departmentId )
    this.addForm.value.workerType = parseInt( this.addForm.value.workerType)
    this.addForm.value.timeType =parseInt(this.addForm.value.timeType)
    this.addForm.value.leavesStructureId = parseInt( this.addForm.value.leavesStructureId)
    this.addForm.value.shiftId = parseInt(this.addForm.value.shiftId )
    this.addForm.value.weekOff = parseInt(this.addForm.value.weekOff)
    this.addForm.value.holidayCategoryId = parseInt(this.addForm.value.holidayCategoryId)
    this.addForm.value.attendanceTrackingId = parseInt(this.addForm.value.attendanceTrackingId)
    this.addForm.value.payGroupId = parseInt(this.addForm.value.payGroupId)
    this.addForm.value.payrollStructureId = parseInt(this.addForm.value.payrollStructureId)
    this.addForm.value.overTimePolicyId = parseInt( this.addForm.value.overTimePolicyId)
    this.addForm.value.eosId = parseInt( this.addForm.value.eosId)
    //this.addForm.value.refNum =0
    this.addForm.patchValue({
      //employeeRevisionsOldList: this.employeeDetails_old,
      revStatus:1,
      reqNum:0
    });


    let employeeRevision = {employeeRevision:this.addForm.value,employeeRevisionsOld:this.employeeDetails_old}
   

    this.EmployeeRevisionManagementService.add(employeeRevision).subscribe((result: any) => {
      // this.toastr.showSuccessMessage('Employee Revision  Request Submitted Successfully.');
        this.employeeRevisionId = result
        this.saveReversedSalaryDetails()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit Employee Revision  Request');
      });
  }


 
  getEOS (){
    this.eosService.getAll()
    .subscribe((result) => {
      this.eosTypes = result
      this.getJobList()
    })
  }
  getEmployeeList() {
    debugger
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result
      const details = this.employeeList.find(emp => emp.id === this.currentUserId);
      this.selectedDatasource = details.firstName
      //this.selectionChanged(details)
      this.addForm.get("requestedby").patchValue(details.id);
      this.getLeaveStructure()
    },
      error => {
        console.error(error);
      });
  }

  getEmployeeDetails(id:number) {
    this.employeeDetails =[]
    this.EmployeeRevisionManagementService.getEmployeeDetailsById(id).subscribe(result => {
      this.employeeDetails = result
      this.employeeDetails_old = result
      this.employeeDetails_old.revStatus = 1
      this.employeeDetails_old.reqNum = 0
      this.bindEmployeeDetails(id)

    },
      error => {
        console.error(error);
      });
  }

  bindEmployeeDetails(id){
     this.addForm.patchValue({
      leavesStructureId: this.employeeDetails.leavesStructureId,
      shiftId:this.employeeDetails.shiftId,
      weekOff:this.employeeDetails.weekOff,
      holidayCategoryId:this.employeeDetails.holidayCategoryId,
      eosId:this.employeeDetails.eosId,
      jobTitleId:this.employeeDetails.jobTitleId,
      departmentId:this.employeeDetails.departmentId,
      workerType:this.employeeDetails.workerType,
      timeType:this.employeeDetails.timeType,
      attendanceTrackingId:this.employeeDetails.attendanceTrackingId,
      payrollStructureId:this.employeeDetails.payrollStructureId,
      payGroupId:this.employeeDetails.payGroupId,
      overTimePolicyId:this.employeeDetails.overTimePolicyId
  })
  // this.addForm.get("leavesStructureId").patchValue(this.employeeDetails.leaveStructureId);
  debugger
    this.getEmployeePayroll(id)
  }

  getLeaveStructure() {
    this.leaveStructureService.getConfiguredLeaveStructures().subscribe(result => {
      this.leaveStructureId = result;
      this.getShiftList()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Structures');
      });
  }

  getShiftList() {
    this.shiftService.getAll().subscribe(result => {
      this.shiftId = result;
      this.getHolidayList()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the shift lists');
      });
  }

  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      this.holidayCategoryId = result;
      this.getEOS()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the holiday lists');
      });
  }

  onOptionsSelected(){
    debugger
   let item:any= this.eosTypes.filter(el=> this.addForm.get('eosId').value==el.id)
   this.addForm.patchValue({
    bfCode:item[0].bfCode,
    bfName:item[0].bfName
   })   
  }
  getJobList() {
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.jobTitleId = result;
      this.getPayrollStructureList()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
      });
  }
   getEmployeePayroll(id) {
    debugger
    this.employeePayrollStructure=[]
    this.employeePayrollStructure_rev =[]
    this.EmployeeRevisionManagementService.getEmployeePayroll(this.addForm.value.payrollStructureId,id).subscribe((result:any) => {
      this.employeePayrollStructure = result;
      this.employeePayrollStructure_rev = result

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the employee payroll structure');
      });
  }

  getEmployeePayroll_rev() {
    debugger
    this.employeePayrollStructure_rev =[]
    this.EmployeeRevisionManagementService.getpayrollComponents(this.addForm.value.payrollStructureId).subscribe(result => {
      this.employeePayrollStructure_rev = result
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the employee payroll structure');
      });
  }
  getPayGroupList() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupId = result;
      this.getOverTimePolicyList()
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
    this.addForm.get("requestedby").patchValue(args.value.id);
  }
  selectionChanged_Employee(args){
    this.addForm.get("employeeId").patchValue(args.value.id);
    this.getEmployeeDetails(args.value.id)
    
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

  getPayrollStructureList() {
    this.payrollStructureService.getConfiguredPayrollStructures().subscribe(result => {
      this.payrollStructureId = result;
      this.getPayGroupList()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll structure lists');
      });
  }


  saveOldSalaryStructure(){
    const details = this.employeeList.find(emp => emp.id === this.currentUserId);
    for(let i=0;i<this.employeePayrollStructure.length;i++){
          this.employeePayrollStructure[i].id = 0
          this.employeePayrollStructure[i].createdDate =new Date(Date.now())
          this.employeePayrollStructure[i].modifiedDate = new Date(Date.now())
          this.employeePayrollStructure[i].createdBy = details.firstName
          this.employeePayrollStructure[i].modifiedBy =  details.firstName
          this.employeePayrollStructure[i].isArchived = false
          this.employeePayrollStructure[i].employeeRevisionId = this.employeeRevisionId
          this.employeePayrollStructure[i].payrollStructureId =0
          this.employeePayrollStructure[i].employeeRevisionDetailId = this.employeeSalaryRevId
          this.employeePayrollStructure[i].payrollStructureId= this.employeeDetails.payrollStructureId    
    }
     //this.employeePayrollStructure = {...this.employeePayrollStructure}
    this.EmployeeRevisionManagementService.save_oldSalaryDetails(this.employeePayrollStructure).subscribe((result: any) => {
      this.toastr.showSuccessMessage('Employee Salary Revision  Request Submitted Successfully.');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit Employee Old Salary Structure');
      });
  }

  saveReversedSalaryDetails(){
    const details = this.employeeList.find(emp => emp.id === this.currentUserId);
    for(let i=0;i<this.employeePayrollStructure_rev.length;i++){
          this.employeePayrollStructure_rev[i].id = 0
          this.employeePayrollStructure_rev[i].createdDate =new Date(Date.now())
          this.employeePayrollStructure_rev[i].modifiedDate = new Date(Date.now())
          this.employeePayrollStructure_rev[i].createdBy = details.firstName
          this.employeePayrollStructure_rev[i].modifiedBy =  details.firstName
          this.employeePayrollStructure_rev[i].isArchived = false
          this.employeePayrollStructure_rev[i].employeeRevisionId = this.employeeRevisionId
          this.employeePayrollStructure_rev[i].payrollStructureId =this.addForm.value.payrollStructureId

    }

    //this.employeePayrollStructure_rev = {...this.employeePayrollStructure_rev}
    this.EmployeeRevisionManagementService.save_ReversedSalaryDetails(this.employeePayrollStructure_rev).subscribe((result: any) => {
      
      this.employeeSalaryRevId = result
      this.saveOldSalaryStructure()
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit Employee Salary Revision  Request');
      });  
  }


  calculateComponentValues(item,index){

    if(item.monthlyAmount > item.maximumLimit){
      this.employeePayrollStructure_rev.forEach((x)=>{
        x.monthlyAmount = ''
      })
     
      return
    }
    this.employeePayrollStructure_rev.map((x: any) => {
      this.valueObject[`{${x.shortCode}}`] = x.monthlyAmount;
     })
    debugger
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
        x.monthlyAmount = eval(formula).toFixed(2);
      }

    })
  console.log('employeePayrollStructure_rev',this.employeePayrollStructure_rev)
  }


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
      createdDate:[new Date(Date.now())],
      modifiedDate:[new Date(Date.now())],
      employeeRevisionsOldList:{}
    });
  }

}
