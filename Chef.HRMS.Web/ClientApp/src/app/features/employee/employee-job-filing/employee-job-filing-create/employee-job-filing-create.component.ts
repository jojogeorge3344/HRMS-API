import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LeaveStructureService } from '@settings/leave/leave-structure/leave-structure.service';
import { HolidayCategoryService } from '@settings/holiday/holiday-category.service';
import { ExpensePolicyService } from '@settings/expense/expense-policy/expense-policy.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { WeekOff } from '../../../../models/common/types/weekoff';
import { AttendanceTrackingType } from '../../../../models/common/types/attendancetrackingtype';
import { AttendanceCaptureSchemeType } from '../../../../models/common/types/attendancecaptureschemetype';
import { HolidayCategory } from '@settings/holiday/holiday-category.model';
import { ExpensePolicy } from '@settings/expense/expense-policy/expense-policy.model';
import { Shift } from '@settings/attendance/shift/shift.model';
import { LeaveStructure } from '@settings/leave/leave-structure/leave-structure.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EosService } from '@settings/eos/eos.service';
import { EmployeeJobFilingService } from '../employee-job-filing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollStructureService } from '@settings/payroll/payroll-structure/payroll-structure.service';
import { PayrollStructure } from '@settings/payroll/payroll-structure/payroll-structure.model';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { PayGroup } from '@settings/payroll/pay-group/pay-group.model';
import { OvertimePolicyService } from '@settings/overtime/overtime-policy/overtime-policy.service';
import { OvertimePolicy } from '@settings/overtime/overtime-policy/overtime-policy.model';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
@Component({
  selector: 'hrms-employee-job-filing-create',
  templateUrl: './employee-job-filing-create.component.html'
})
export class EmployeeJobFilingCreateComponent implements OnInit {

  addForm: FormGroup;
  weekOff: object;
  attendanceTracking: object;
  expensePolicy: object;
  attendanceCaptureScheme: object;
  onBoardingFlow: object;
  holidayList: HolidayCategory[];
  holidayCategoryId: HolidayCategory[];
  expensePolicyId: ExpensePolicy[];
  currentUserId: number;
  shiftId: Shift[];
  leaveStructureId: LeaveStructure[];
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  attendanceCaptureSchemeTypeKeys: number[];
  attendanceCaptureSchemeType = AttendanceCaptureSchemeType;
  eosTypes;
  @Output() jobFilingsForm = new EventEmitter<boolean>();
  @Input() jobFilings: any;
  @Input() passEmployeeId:any
  payrollStructureId: PayrollStructure[];
  payGroupId: PayGroup[];
  overTimePolicyId: OvertimePolicy[];
  paymentMode = PaymentMode;
  paymentModeKeys: number[];
  buttonDisable: boolean=false;

  constructor(
    private leaveStructureService: LeaveStructureService,
    private holidayCategoryService: HolidayCategoryService,
    private shiftService: ShiftService,
    private expensePolicyService: ExpensePolicyService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private eosService: EosService,
    private employeeJobFilingService: EmployeeJobFilingService,
    private router: Router,
    private payrollStructureService: PayrollStructureService,
    private payGroupService: PayGroupService,
    private overtimePolicyService: OvertimePolicyService,
    private route: ActivatedRoute,
  ) {
    this.paymentModeKeys = Object.keys(this.paymentMode).filter(Number).map(Number);
   }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    if (this.jobFilings != null) {
      this.addForm.patchValue(this.jobFilings);
    }
    this.route.params.subscribe((params: any) => {
      if(params.jobFilingId){
        this.employeeJobFilingService.get(params.jobFilingId).subscribe(result => {     
          this.addForm.patchValue(result);
          this.buttonDisable=true
    
        },)
      }
      
    });
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    this.attendanceCaptureSchemeTypeKeys = Object.keys(this.attendanceCaptureSchemeType).filter(Number).map(Number);
    this.getLeaveStructure();
    this.getHolidayList();
    this.getShiftList();
    this.getExpensePolicyList();
    this.eosService.getAll()
      .subscribe((result) => {
        this.eosTypes = result
      })
      this.getPayrollStructureList();
      this.getPayGroupList();
      this.getOverTimePolicyList();
  }
  onOptionsSelected(){
    debugger
   let item:any= this.eosTypes.filter(el=> this.addForm.get('eosId').value==el.id)
   this.addForm.patchValue({
    bfCode:item[0].bfCode,
    bfName:item[0].bfName
   })   
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

  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      this.holidayCategoryId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the holiday lists');
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

  getExpensePolicyList() {
    this.expensePolicyService.getAllConfiguredExpensePolicies().subscribe(result => {
      this.expensePolicyId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense policy lists');
      });
  }

  onSubmit() {
    debugger
    const addJobFilings = this.addForm.value;
    addJobFilings.employeeId = this.passEmployeeId;
    this.employeeJobFilingService.add(addJobFilings).subscribe((result)=>{
      addJobFilings.switchResult=result
      this.jobFilingsForm.emit(addJobFilings);
      this.toastr.showSuccessMessage('Employee Job filings added successfully!');
     
    })
    
    
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: '',
      leaveStructureId: ['', [
        Validators.required
      ]],
      shiftId: ['', [
        Validators.required
      ]],
      weekOff: [null, [
        Validators.required
      ]],
      holidayCategoryId: ['', [
        Validators.required
      ]],
      attendanceTracking: [null, [
        Validators.required
      ]],
      expensePolicyId:[0, [
      ]],
      attendanceCaptureScheme: [null, [
        Validators.required
      ]],
      createdDate: [new Date()],
      eosId: [0],
      bfCode: [''],
      bfName: [''],
      payrollStructureId: [null, [Validators.required]
    ],
     overTimePolicyId: [null, [Validators.required]
       
     ],
     payGroupId: [null, [Validators.required]
     
     ],
     paymentMode: [null, [Validators.required]
       
     ],
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
  selectPayment(key) {
    this.addForm.patchValue({ paymentMode: key });
  }
}
