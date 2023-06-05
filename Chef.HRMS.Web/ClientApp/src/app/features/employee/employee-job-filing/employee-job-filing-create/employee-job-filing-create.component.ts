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
  holidayCategoryId: any;
  expensePolicyId: any;
  currentUserId: number;
  shiftId: any;
  leaveStructureId: any;
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  attendanceCaptureSchemeTypeKeys: number[];
  attendanceCaptureSchemeType = AttendanceCaptureSchemeType;
  eosTypes;
  @Output() jobFilingsForm = new EventEmitter<boolean>();
  @Input() jobFilings: any;
  @Input() passEmployeeId: any
  payrollStructureId:any;
  payGroupId: any;
  overTimePolicyId: any;
  paymentMode = PaymentMode;
  paymentModeKeys: number[];
  buttonDisable: boolean = false;
  leaveStructObj: any;
  shiftObj: any;
  holidayListObj: any;
  expensePolicyObj:any;
  payrollStructObj:any;
  paygroupObj:any;
  overTimePolicyObj:any;
  eosTypeObj: any;

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
      if (params.jobFilingId) {
        this.employeeJobFilingService.get(params.jobFilingId).subscribe(result => {
          this.addForm.patchValue(result);
          this.buttonDisable = true

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
    this.getEosType()
    this.getPayrollStructureList();
    this.getPayGroupList();
    this.getOverTimePolicyList();
  }
  onOptionsSelected() {
    let item: any = this.eosTypes.filter(el => this.addForm.get('eosId').value == el.id)
    this.addForm.patchValue({
      bfCode: item[0].bfCode,
      bfName: item[0].bfName
    })
  }
  getLeaveStructure() {
    this.leaveStructureService.getConfiguredLeaveStructures().subscribe(result => {
      let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.leaveStructureId = [...result, temp];
      let item = result.find((item) => this.addForm.get('leaveStructureId').value == item.id)
      this.leaveStructObj = item;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Structures');
      });
  }
  getEosType(){
    debugger
    this.eosService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, bfName: 'test', isLastRow: true }
        // lastrow
        this.eosTypes = [...result, temp];
        let item = result.find((item) => this.addForm.get('eosId').value == item.id)
        this.eosTypeObj = item;
      })
  }
  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.holidayCategoryId = [...result, temp];
      let item = result.find((item) => this.addForm.get('holidayCategoryId').value == item.id)
      this.holidayListObj = item;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the holiday lists');
      });
  }

  getShiftList() {
    this.shiftService.getAll().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.shiftId = [...result, temp];
      let item = result.find((item) => this.addForm.get('shiftId').value == item.id)
      this.shiftObj = item;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the shift lists');
      });
  }

  getExpensePolicyList() {
    this.expensePolicyService.getAllConfiguredExpensePolicies().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.expensePolicyId = [...result, temp];
      this.expensePolicyObj= result.find((item) => this.addForm.get('expensePolicyId').value == item.id)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense policy lists');
      });
  }
  selectLeaveStructure(args) {
    this.addForm.patchValue({
      leaveStructureId: args.value.id
    })
  }
  selectShift(args) {
    this.addForm.patchValue({
      shiftId: args.value.id
    })
  }
  selectHoliday(args) {
    this.addForm.patchValue({
      holidayCategoryId: args.value.id
    })
  }
  selectExpensePolicy(args){
    if(args.value && args.value.id){
      this.addForm.patchValue({
        expensePolicyId: args.value.id
      })
    }else{
      this.addForm.patchValue({
        expensePolicyId: 0
      })  
    }
  }
  selectPayrollStructure(args){
    this.addForm.patchValue({
      payrollStructureId: args.value.id
    }) 
  }
  selectPaygroup(args){
    this.addForm.patchValue({
      payGroupId: args.value.id
    }) 
  }
  selectOvertimePolicy(args){
    this.addForm.patchValue({
      overTimePolicyId: args.value.id
    })  
  }
  selectEosType(args){
    if(args.value &&  args.value.id){
      this.addForm.patchValue({
        eosId: args.value.id,
        bfCode: args.value.bfCode,
        bfName: args.value.bfName
      })
    }
    else{
      this.addForm.patchValue({
        bfCode: null,
        bfName: null,
        eosId:0
      })
    }
    }
  refreshEosType(event){
    event.stopPropagation();
    event.preventDefault();
    this.getEosType()   
  }
  refreshOvertimePolicy(event){
    event.stopPropagation();
    event.preventDefault();
    this.getOverTimePolicyList()   
  }
  refreshPaygroup(event){
    event.stopPropagation();
    event.preventDefault();
    this.getPayGroupList()   
  }
  refreshPayrollStructure(event){
    event.stopPropagation();
    event.preventDefault();
    this.getPayrollStructureList()  
  }
  refresExpensePolicy(event){
    event.stopPropagation();
    event.preventDefault();
    this.getExpensePolicyList()
  }
  refreshHoliday(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getHolidayList()
  }
  refreshShift(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getShiftList()
  }
  refreshLeaveStructure(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getLeaveStructure()

  }
  onSubmit() {
    const addJobFilings = this.addForm.value;
    addJobFilings.employeeId = this.passEmployeeId;
    this.employeeJobFilingService.add(addJobFilings).subscribe((result) => {
      addJobFilings.switchResult = result
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
      expensePolicyId: [0, [
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
      let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.payrollStructureId = [...result, temp];
      let item = result.find((item) => this.addForm.get('payrollStructureId').value == item.id)
      this.payrollStructObj = item;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll structure lists');
      });
  }
  getPayGroupList() {
    this.payGroupService.getAll().subscribe(result => {
      let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.payGroupId = [...result, temp];
      let item = result.find((item) => this.addForm.get('payGroupId').value == item.id)
      this.paygroupObj = item;

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the pay group lists');
      });
  }
  getOverTimePolicyList() {
    this.overtimePolicyService.getConfiguredOvertimePolicies().subscribe(result => {
      let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.overTimePolicyId = [...result, temp];
      let item = result.find((item) => this.addForm.get('overTimePolicyId').value == item.id)
      this.overTimePolicyObj = item;
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
