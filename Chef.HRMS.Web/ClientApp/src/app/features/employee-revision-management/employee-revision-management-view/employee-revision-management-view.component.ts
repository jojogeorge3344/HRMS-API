import { Component, Input, OnInit } from '@angular/core';
import { EmployeeRevisionManagementService } from '../employee-revision-management.service';
import { EmployeeService } from '@features/employee/employee.service';
import {  NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LeaveStructureService } from '@settings/leave/leave-structure/leave-structure.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { WeekOff } from 'src/app/models/common/types/weekoff';
import { HolidayCategoryService } from '@settings/holiday/holiday-category.service';
import { EosService } from '@settings/eos/eos.service';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { PayrollStructureService } from '@settings/payroll/payroll-structure/payroll-structure.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { OvertimePolicyService } from '@settings/overtime/overtime-policy/overtime-policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { WorkerType } from 'src/app/models/common/types/workertype';
import { TimeType } from 'src/app/models/common/types/timetype';
import { AttendanceTrackingType } from 'src/app/models/common/types/attendancetrackingtype';
@Component({
  selector: 'hrms-employee-revision-management-view',
  templateUrl: './employee-revision-management-view.component.html',
  styleUrls: ['./employee-revision-management-view.component.scss']
})
export class EmployeeRevisionManagementViewComponent implements OnInit {
  //@Input() 
  reqId: any;
  revisionRequest:any=[]
  employeeList:any=[]
  employee:any=''
  leaveStructure:any=''
  leaveStructureId:any=[]
  shiftId:any=[]
  shift:any=''
  weekOffType = WeekOff;
  weekOffTypeKeys:any=[]
  weekOff:any=''
  holidayCategoryId:any=[]
  holidayCategory:any=''
  eosTypes:any=[]
  eos:any=''
  reqBy:any=''
  designation:any=''
  jobTitleId:any=''
  departmentTypeKeys: number[];
  departmentType = DepartmentType;
  workerTypeKeys: number[];
  workerType = WorkerType;
  timeTypeKeys: number[];
  timeType = TimeType;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  payrollStructureId:any=[]
  payrollstructure=''
  payGroupId:any=[]
  payGroup=''
  overTimePolicyId:any=[]
  overTime:any=''
  activeTabId: number;
  employeePayrollStructure:any=[]
  employeePayrollStructure_rev:any=[]
  emp_oldDetails:any=[]
  employee_old:any=''
  reqBy_old:any=''
  leaveStructure_old:any=''
  shift_old:any=''
  holidayCategory_old:any=''
  eos_old:any=''
  designation_old:any=''
  payrollstructure_old:any=''
  payGroup_old:any=''
  overTime_old:any=''
  constructor(
    // public activeModal: NgbActiveModal,
    private employeeService: EmployeeService,
    private leaveStructureService: LeaveStructureService,
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
  ) { }

  ngOnInit(): void {

    // this.route.queryParams.subscribe(params => {
    //   this.reqId = params.reqId;
    // })
    this.route.params.subscribe((params: any) => {
      this.reqId = params['id'];
    });
    this.activeTabId = 1;
    this.route.params.subscribe((params:any) => {
      if(params['activeTabId'])
        this.activeTabId = parseInt(params['activeTabId']);
    });

    this.getRevisionRequest()
    this.getOldDetails()
    // this.getEmployeeList()
    // this.getLeaveStructure()
    // this.getShiftList()
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    // this.getHolidayList()
  
   
  }


  getEosDetails(){
    this.eosService.getAll()
    .subscribe((result) => {
      this.eosTypes = result
      
      const details = this.eosTypes.find(eos => eos.id === this.revisionRequest.eosId);
      this.eos = details.bfName
      const details_old = this.eosTypes.find(eos => eos.id === this.revisionRequest.eosId);
      this.eos_old = details_old.bfName
      this.getJobList()
    })
  }

  getRevisionRequest() {
    this.EmployeeRevisionManagementService.get(this.reqId).subscribe(result => {
      this.revisionRequest = result;
      this.getEmployeeList()
      this.getEmployeeOldSalaryDetails(this.revisionRequest.id)
     this.getEmployeeReversedSalaryDetails(this.revisionRequest.id)
      
    },
      error => {
        console.error(error);
      });
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result
      const details = this.employeeList.find(emp => emp.id === this.revisionRequest.employeeId);
      this.employee = details.firstName
      const details_req = this.employeeList.find(emp => emp.id === this.revisionRequest.requestedBy);
      this.reqBy = details_req.firstName

      const details_old = this.employeeList.find(emp => emp.id === this.emp_oldDetails?.employeeId);
      this.employee_old = details_old.firstName
      const details_req_old = this.employeeList.find(emp => emp.id === this.emp_oldDetails?.requestedBy);
      this.reqBy_old = details_req_old.firstName
      this.getLeaveStructure()
    },
      error => {
        console.error(error);
      });
  }

  getLeaveStructure() {
    this.leaveStructureService.getConfiguredLeaveStructures().subscribe(result => {
      this.leaveStructureId = result;
      const details = this.leaveStructureId.find(leav => leav.id === this.revisionRequest.leavesStructureId);
      this.leaveStructure = details.description

      const details_old = this.leaveStructureId.find(leav => leav.id === this.emp_oldDetails?.leavesStructureId);
      this.leaveStructure_old = details_old.description
      this.getShiftList()
    },
      error => {
        console.error(error);
      });
  }

  getShiftList() {
    this.shiftService.getAll().subscribe(result => {
      this.shiftId = result;
      const details = this.shiftId.find(leav => leav.id === this.revisionRequest.shiftId);
      this.shift = details.name
      const details_old = this.shiftId.find(leav => leav.id === this.emp_oldDetails?.shiftId);
      this.shift_old = details_old.name
      this.getHolidayList()
    },
      error => {
        console.error(error);
      });
  }
  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      this.holidayCategoryId = result;
 
      const details = this.holidayCategoryId.find(hol => hol.id === this.revisionRequest.holidayCategoryId);
      this.holidayCategory = details.name
      const details_old = this.holidayCategoryId.find(hol => hol.id === this.emp_oldDetails?.holidayCategoryId);
      this.holidayCategory_old = details_old.name
      this.getEosDetails()
    },
      error => {
        console.error(error);
      });
  }
  getJobList() {
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.jobTitleId = result;
      const details = this.jobTitleId.find(job => job.id === this.revisionRequest.jobTitleId);
      this.designation = details.name
      const details_old = this.jobTitleId.find(job => job.id === this.emp_oldDetails?.jobTitleId);
      this.designation_old = details_old.name
      this.getPayrollStructureList()
    },
      error => {
        console.error(error);
        
      });
  }

  getPayrollStructureList() {
    this.payrollStructureService.getConfiguredPayrollStructures().subscribe(result => {
      this.payrollStructureId = result;
      const details = this.payrollStructureId.find(pay => pay.id === this.revisionRequest.payrollStructureId);
      this.payrollstructure = details.description
      const details_old = this.payrollStructureId.find(pay => pay.id === this.emp_oldDetails?.payrollStructureId);
      this.payrollstructure_old = details_old.description
      this.getPayGroupList()
    },
      error => {
        console.error(error);
       
      });
  }

  getPayGroupList() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupId = result;
      const details = this.payGroupId.find(grp => grp.id === this.revisionRequest.payGroupId);
      this.payGroup = details.name
      const details_old = this.payGroupId.find(grp => grp.id === this.emp_oldDetails?.payGroupId);
      this.payGroup_old = details_old.name
      this.getOverTimePolicyList()
    },
      error => {
        console.error(error);
        
      });
  }
  getOverTimePolicyList() {
    this.overtimePolicyService.getConfiguredOvertimePolicies().subscribe(result => {
      this.overTimePolicyId = result;
      const details = this.overTimePolicyId.find(o => o.id === this.revisionRequest.overTimePolicyId);
      this.overTime = details.name
      const details_old = this.overTimePolicyId.find(o => o.id === this.emp_oldDetails?.overTimePolicyId);
      this.overTime_old = details_old.name
    },
      error => {
        console.error(error);
       
      });
  }

  getEmployeeOldSalaryDetails(id){
    this.employeePayrollStructure=[]
      this.EmployeeRevisionManagementService.get_oldSalaryDetails(id).subscribe(result => {
        this.employeePayrollStructure = result;
        
      },
        error => {
          console.error(error);
         
        });
    }
  
    getEmployeeReversedSalaryDetails(id){
      this.employeePayrollStructure_rev=[]
      this.EmployeeRevisionManagementService.get_ReversedSalaryDetails(id).subscribe(result => {
        this.employeePayrollStructure_rev = result;
      },
        error => {
          console.error(error);
          
        });
    }


    getOldDetails(){
      this.EmployeeRevisionManagementService.getOldDetails(this.reqId).subscribe(result => {
      this.emp_oldDetails = result;
      this.getEmployeeList()
        
      },
        error => {
          console.error(error);
        });

    }

}
