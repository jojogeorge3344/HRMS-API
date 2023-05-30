import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeJobFilingService } from '../employee-job-filing.service';
import { LeaveStructureService } from '@settings/leave/leave-structure/leave-structure.service';
import { HolidayCategoryService } from '@settings/holiday/holiday-category.service';
import { ExpensePolicyService } from '@settings/expense/expense-policy/expense-policy.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { PayrollStructureService } from '@settings/payroll/payroll-structure/payroll-structure.service';
import { OvertimePolicyService } from '@settings/overtime/overtime-policy/overtime-policy.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { ActivatedRoute } from '@angular/router';
import { WeekOff } from '../../../../models/common/types/weekoff';
import { AttendanceTrackingType } from '../../../../models/common/types/attendancetrackingtype';
import { AttendanceCaptureSchemeType } from '../../../../models/common/types/attendancecaptureschemetype';
import { PayGroup } from '@settings/payroll/pay-group/pay-group.model';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
import { HolidayCategory } from '@settings/holiday/holiday-category.model';
import { ExpensePolicy } from '@settings/expense/expense-policy/expense-policy.model';
import { PayrollStructure } from '@settings/payroll/payroll-structure/payroll-structure.model';
import { OvertimePolicy } from '@settings/overtime/overtime-policy/overtime-policy.model';
import { LeaveStructure } from '@settings/leave/leave-structure/leave-structure.model';
import { Shift } from '@settings/attendance/shift/shift.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EosService } from '@settings/eos/eos.service';

@Component({
  selector: 'hrms-employee-job-filing-edit',
  templateUrl: './employee-job-filing-edit.component.html'
})
export class EmployeeJobFilingEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  id: any;
  jobFilingId: any;
  weekOff: object;
  attendanceTracking: object;
  expensePolicy: object;
  attendanceCaptureScheme: object;
  onBoardingFlow: object;
  holidayCategoryId: any;
  expensePolicyId: any;
  shiftId: any;
  payrollStructureId: any;
  overTimePolicyId: any;
  payGroupId: any;
  leaveStructureId: any;
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  attendanceCaptureSchemeTypeKeys: number[];
  attendanceCaptureSchemeType = AttendanceCaptureSchemeType;
  paymentMode = PaymentMode;
  paymentModeKeys: number[];
  eosTypes: any;
  checkFlag: boolean = false
  leaveStructObj: any;
  shiftObj: any;
  holidayListObj: any;
  expensePolicyObj: any;
  payrollStructObj: any;
  paygroupObj: any;
  overTimePolicyObj: any;
  eosTypeObj: any;
  jobFilingDetails: any;
  @Output() EditByCreateJobFilingId = new EventEmitter<any>();
  @Input() jobFilingparamsId: any

  constructor(
    private employeeJobFilingService: EmployeeJobFilingService,
    private leaveStructureService: LeaveStructureService,
    private eosService: EosService,
    private holidayCategoryService: HolidayCategoryService,
    private expensePolicyService: ExpensePolicyService,
    private shiftService: ShiftService,
    private payrollStructureService: PayrollStructureService,
    private overtimePolicyService: OvertimePolicyService,
    private payGroupService: PayGroupService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
  ) {
    this.paymentModeKeys = Object.keys(this.paymentMode).filter(Number).map(Number);
    this.editForm = this.createFormGroup();
    console.log('cons', this.editForm.value)
  }

  ngOnInit(): void {
    debugger
    this.currentUserId = getCurrentUserId();
    // this.editForm = this.createFormGroup();
    console.log('INIT', this.editForm.value)
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    this.attendanceCaptureSchemeTypeKeys = Object.keys(this.attendanceCaptureSchemeType).filter(Number).map(Number);
    if (!this.jobFilingparamsId) {
      this.route.params.subscribe((params: any) => {
        this.jobFilingId = params['jobFilingId'];
        this.id = params['id'];
      });
    } else {
      this.route.params.subscribe((params: any) => {
        this.jobFilingId = this.jobFilingparamsId
        this.id = params['id'];
      })
    }
    this.getLeaveStructure();
    this.getHolidayList();
    this.getExpensePolicyList();
    this.getShiftList();
    this.getPayGroupList();
    this.getPayrollStructureList();
    this.getOverTimePolicyList();
    this.getEosType()
    this.getJobFilingID();

  }
  // onOptionsSelected(){
  //   debugger
  //  let item:any= this.eosTypes.filter(el=> this.editForm.get('eosId').value==el.id)
  //  this.editForm.patchValue({
  //   bfCode:item[0].bfCode,
  //   bfName:item[0].bfName
  //  })   
  // }
  ngAfterViewInit(){
  }

  getEosType() {
    debugger
    this.eosService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, bfName: 'test', isLastRow: true }
        // lastrow
        this.eosTypes = [...result, temp];
        let eosTypesItem = this.setValueById(this.eosTypes, this.jobFilingDetails.eosId)
        this.eosTypeObj = eosTypesItem;
      })
  }

  getJobFilingID() {
    debugger
    this.employeeJobFilingService.get(this.jobFilingId).subscribe(result => {
      this.editForm.patchValue(result);
      this.jobFilingDetails = result
      
      if (result) {
        this.checkFlag = true
        // this.editForm.get("payrollStructureId").setValidators(null)
        // this.editForm.get("payGroupId").setValidators(null)
        // this.editForm.get("overTimePolicyId").setValidators(null)
        // this.editForm.get("paymentMode").setValidators(null)
      } else {
        this.checkFlag = false
        // this.editForm.get("payrollStructureId").setValidators([Validators.required])
        // this.editForm.get("payGroupId").setValidators([Validators.required])
        // this.editForm.get("overTimePolicyId").setValidators([Validators.required])
        // this.editForm.get("paymentMode").setValidators([Validators.required])
      }
    },
      error => {
        console.error(error);
      });
  }

  selectPayment(key) {
    this.editForm.patchValue({ paymentMode: key });
  }

  getLeaveStructure() {
    debugger
    this.leaveStructureService.getConfiguredLeaveStructures().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.leaveStructureId = [...result, temp];
      let leaveStructureIdItem = this.setValueById(this.leaveStructureId, this.jobFilingDetails.leaveStructureId)
      this.leaveStructObj = leaveStructureIdItem;

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Structures');
      });
  }

  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.holidayCategoryId = [...result, temp];
      let holidayCategoryIdItem = this.setValueById(this.holidayCategoryId, this.jobFilingDetails.holidayCategoryId)
      this.holidayListObj = holidayCategoryIdItem;
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
      let shiftIdItem = this.setValueById(this.shiftId, this.jobFilingDetails.shiftId)
      this.shiftObj = shiftIdItem;

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
      let expensePolicyIdItem = this.setValueById(this.expensePolicyId, this.jobFilingDetails.expensePolicyId)
      this.expensePolicyObj = expensePolicyIdItem;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense policy lists');
      });
  }

  getPayGroupList() {
    this.payGroupService.getAll().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.payGroupId = [...result, temp];
      let payGroupIdItem = this.setValueById(this.payGroupId, this.jobFilingDetails.payGroupId)
      this.paygroupObj = payGroupIdItem;

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the pay group lists');
      });
  }

  getPayrollStructureList() {
    this.payrollStructureService.getConfiguredPayrollStructures().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.payrollStructureId = [...result, temp];
      let payrollStructureIdItem = this.setValueById(this.payrollStructureId,this.jobFilingDetails.payrollStructureId)
      this.payrollStructObj = payrollStructureIdItem;

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll structure lists');
      });
  }

  getOverTimePolicyList() {
    this.overtimePolicyService.getConfiguredOvertimePolicies().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.overTimePolicyId = [...result, temp];
      let overTimePolicyIdItem = this.setValueById(this.overTimePolicyId,this.jobFilingDetails.overTimePolicyId)
      this.overTimePolicyObj = overTimePolicyIdItem;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the over time policy lists');
      });
  }
  selectLeaveStructure(args) {
    this.editForm.patchValue({
      leaveStructureId: args.value.id
    })
  }
  selectShift(args) {
    this.editForm.patchValue({
      shiftId: args.value.id
    })
  }
  selectHoliday(args) {
    this.editForm.patchValue({
      holidayCategoryId: args.value.id
    })
  }
  selectExpensePolicy(args) {
    this.editForm.patchValue({
      expensePolicyId: args.value.id
    })
  }
  selectPayrollStructure(args) {
    this.editForm.patchValue({
      payrollStructureId: args.value.id
    })
  }
  selectPaygroup(args) {
    this.editForm.patchValue({
      payGroupId: args.value.id
    })
  }
  selectOvertimePolicy(args) {
    this.editForm.patchValue({
      overTimePolicyId: args.value.id
    })
  }
  selectEosType(args) {
    debugger
    this.editForm.patchValue({
      eosId: args.value.id,
    })
    let item: any = this.eosTypes.filter(el => this.editForm.get('eosId').value == el.id)
    this.editForm.patchValue({
      bfCode: item[0].bfCode,
      bfName: item[0].bfName
    })
  }
  refreshEosType(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getEosType()
  }
  refreshOvertimePolicy(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getOverTimePolicyList()
  }
  refreshPaygroup(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getPayGroupList()
  }
  refreshPayrollStructure(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getPayrollStructureList()
  }
  refresExpensePolicy(event) {
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
    debugger
    const editJobFilings = this.editForm.value;
    editJobFilings.employeeId = parseInt(this.id, 10);
    editJobFilings.id = parseInt(this.jobFilingId, 10);
    if (!this.checkFlag == true) {
      this.employeeJobFilingService.add(editJobFilings).subscribe((result) => {
        this.toastr.showSuccessMessage('Employee Job filings added successfully!');
        this.EditByCreateJobFilingId.emit(result)
      })
    } else {
      this.employeeJobFilingService.update(editJobFilings).subscribe((result: any) => {
        this.toastr.showSuccessMessage('Employee Job Fillings Details updated successfully!');
        // this.router.navigateByUrl('/employee');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to update the Employee Job Fillings Details');
        });
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
      leaveStructureId: ['', [
        Validators.required
      ]],
      shiftId: ['', [
        Validators.required
      ]],
      weekOff: ['', [
        Validators.required
      ]],
      holidayCategoryId: ['', [
        Validators.required
      ]],
      attendanceTracking: ['', [
        Validators.required
      ]],
      expensePolicyId: [0, [
      ]],
      attendanceCaptureScheme: ['', [
        Validators.required
      ]],
      payrollStructureId: [null, [Validators.required]
      ],
      overTimePolicyId: [null, [Validators.required]

      ],
      payGroupId: [null, [Validators.required]

      ],
      paymentMode: [null, [Validators.required]

      ],
      eosId: [0],
      bfCode: [null],
      bfName: [null],
      createdDate: [new Date()]
    });
  }

  setValueById(list, value) {
    console.log("list", list, value);

    return list.find((item) => value == item.id)
  }
}


