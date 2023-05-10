import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import {
  NgbActiveModal,
  NgbModal,
  NgbTabset,
} from "@ng-bootstrap/ng-bootstrap";
import { LeaveComponentService } from "../leave-component.service";
import { LeaveComponent } from "../leave-component.model";
import { GenderType } from "../../../../../models/common/types/gendertype";
import { MaritalStatusType } from "../../../../../models/common/types/maritalstatustype";
import { duplicateNameValidator } from "@shared/utils/validators.functions";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { BaseType } from "@settings/leave/basetype.enum";
import { EligiblityBase } from "@settings/leave/Eligibilitybase.enum";
import { LeaveCutoffType } from "@settings/leave/leavecuttoff.enum";
import { LeaveType } from "@settings/leave/leavetype.enum";
import { Loptype } from "@settings/leave/lopdays.enum";
import { LeaveEligiblityService } from "../leave-eligiblity.service";
import { OvertimePolicyCalculationComponent } from "@settings/overtime/overtime-policy-configuration/overtime-policy-calculation/overtime-policy-calculation.component";
import { LeaveSlabService } from "../leave-slab-service";
import { valueTypeOff } from "src/app/models/common/types/leaveSlabOff";


@Component({
  selector: 'hrms-leave-component-view',
  templateUrl: './leave-component-view.component.html',
  styleUrls: ['./leave-component-view.component.scss']
})
export class LeaveComponentViewComponent implements OnInit {

  @Input() leaveComponent: LeaveComponent;
  @Input() isDisabled: boolean;
  @Input() leaveComponentNames: string[];
  @Input() leaveComponentCodes: string[];
  @ViewChild("myTabSet") tabSet: NgbTabset;

  ViewForm: FormGroup;
  ViewForm2: FormGroup;

  genderTypes = GenderType;
  maritalStatusTypes = MaritalStatusType;
  basetype = BaseType;
  eligiblitybase = EligiblityBase;
  leavecutofftype = LeaveCutoffType;
  leavetypes = LeaveType;
  lopdays = Loptype;

  currentUserId: number;
  leavetypearray: number[];
  lopday: number[];
  leavecutoff: number[];
  basetypes: number[];
  eligiblitybases: number[];
  dedecutionarray: [];
  leaves: [];
  genderTypeKeys: number[];
  maritalStatusTypeKeys: number[];

  isCfLimit: boolean = true;
  isEncash: boolean = true;
  isAnnual: boolean = true;
  isEncashBf: boolean = true;
  isEncashLimit: boolean = true;
  detectionTypeList: any;
  accuralList: any;
  accuralBenefitList: any;

  configId: any;
  encashBfList: any;
  isSaveDisable: boolean = false;
  activeTab: string = "basic";
  leaveSlabDetails: any;
  valueSlabOffTypeKeys: number[];
  valueSlabOffType = valueTypeOff;

  constructor(
    private leaveComponentService: LeaveComponentService,
    private leaveEligiblityService: LeaveEligiblityService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    public leaveSlabService: LeaveSlabService,
  ) {}

  ngOnInit(): void {
    this.genderTypeKeys = Object.keys(this.genderTypes)
      .filter(Number)
      .map(Number);
    this.basetypes = Object.keys(this.basetype).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusTypes)
      .filter(Number)
      .map(Number);
    this.eligiblitybases = Object.keys(this.eligiblitybase)
      .filter(Number)
      .map(Number);
    this.leavecutoff = Object.keys(this.leavecutofftype)
      .filter(Number)
      .map(Number);
    this.leavetypearray = Object.keys(this.leavetypes)
      .filter(Number)
      .map(Number);
    this.lopday = Object.keys(this.lopdays).filter(Number).map(Number);

    this.currentUserId = getCurrentUserId();
    this.ViewForm = this.createFormGroup();
    this.ViewForm2 = this.createFormGroup2();
    // this.toggleGender(this.leaveComponent.isRestrictedToGender);
    // this.toggleMaritalStatus(this.leaveComponent.isRestrictedToMaritalStatus);
    this.valueSlabOffTypeKeys = Object.keys(this.valueSlabOffType).filter(Number).map(Number);
    this.getConfigureData();
    this.getDeductionType();
    this.getAccrualBenefitType();
    this.getAccrualType();
    this.getDetectionListType();
    this.getEncashBF();
    this.ViewForm.patchValue(this.leaveComponent);
    this.getLeaveType();
    this.getLeaveSlablist(this.leaveComponent.id)
  }

  getDeductionType() {
    this.leaveComponentService.getbenefitcategory().subscribe((result: any) => {
      this.dedecutionarray = result;
    });
  }

  getConfigureData() {
    this.leaveEligiblityService.get(this.leaveComponent.id).subscribe((res) => {
      let result = res[0];
      this.configId = res[0].id;
      this.ViewForm2.patchValue({
        id: this.configId,
      });
      this.ViewForm2.patchValue(result);
      if (res[0].leaveType == 1) {
        this.ViewForm2.get("leaveEncashment").enable();
        this.ViewForm2.get("annualLeave").enable();
      } else {
        this.ViewForm2.get("leaveEncashment").disable();
        this.ViewForm2.get("annualLeave").disable();
      }
      if (res[0].isEncash == true) {
        this.ViewForm2.get("encashBFCode").enable();
        this.ViewForm2.get("encashLimitDays").enable();
      } else {
        this.ViewForm2.get("encashBFCode").disable();
        this.ViewForm2.get("encashLimitDays").disable();
      }
      if (res[0].isCarryForward == true) {
        this.ViewForm2.get("cfLimitDays").enable();
      } else {
        this.ViewForm2.get("cfLimitDays").disable();
      }
    });
  }

  // toggleGender(checked) {
  //   if (checked) {
  //     this.ViewForm.addControl(
  //       "restrictedToGender",
  //       new FormControl(
  //         { value: null, disabled: this.isDisabled },
  //         Validators.required
  //       )
  //     );
  //   } else {
  //     this.ViewForm.removeControl("restrictedToGender");
  //   }
  // }

  // toggleMaritalStatus(checked) {
  //   if (checked) {
  //     this.ViewForm.addControl(
  //       "restrictedToMaritalStatus",
  //       new FormControl(
  //         { value: null, disabled: this.isDisabled },
  //         Validators.required
  //       )
  //     );
  //   } else {
  //     this.editForm.removeControl("restrictedToMaritalStatus");
  //   }
  // }

  get name() {
    return this.ViewForm.get("name");
  }

  get code() {
    return this.ViewForm.get("code");
  }

  getDetectionListType() {
    this.leaveComponentService.getDetectiontype().subscribe((res) => {
      this.detectionTypeList = res;
    });
  }

  getAccrualType() {
    this.leaveComponentService.getAccrualtype().subscribe((res) => {
      this.accuralList = res;
    });
  }
  getAccrualBenefitType() {
    this.leaveComponentService.getAccrualBenefittype().subscribe((res) => {
      this.accuralBenefitList = res;
    });
  }

  getCarry(event) {
    if (event == "true") {
      this.ViewForm2.get("cfLimitDays").enable();
      this.isCfLimit = false;
    } else {
      this.ViewForm2.get("cfLimitDays").disable();
      this.isCfLimit = true;
      //this.editForm2.controls['cfLimitDays'].reset();
      this.ViewForm2.patchValue({
        cfLimitDays: 0,
      });
    }
  }

  getLeave(event) {
    if (event == 1) {
      this.ViewForm2.get("leaveEncashment").enable();
      this.ViewForm2.get("annualLeave").enable();
      this.isEncash = false;
      this.isAnnual = false;
    } else {
      this.ViewForm2.get("leaveEncashment").disable();
      this.ViewForm2.get("annualLeave").disable();
      this.ViewForm2.patchValue({
        leaveEncashment: 0,
        annualLeave: 0,
      });
      this.isEncash = true;
      this.isAnnual = true;
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }

  getcash(event) {
    if (event == "true") {
      this.ViewForm2.get("encashBFCode").enable();
      this.ViewForm2.get("encashLimitDays").enable();
      this.isEncashBf = false;
      this.isEncashLimit = false;
    } else {
      this.ViewForm2.get("encashBFCode").disable();
      this.ViewForm2.get("encashLimitDays").disable();
      this.isEncashBf = true;
      this.isEncashLimit = true;
      this.ViewForm2.patchValue({
        encashBFCode: 0,
        encashLimitDays: 0,
      });
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }

  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(
      OvertimePolicyCalculationComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula =
      this.ViewForm2.value.vacationSalaryFormula;

    modalRef.result.then((result) => {
      console.log(result);
      if (result !== "Close click") {
        this.ViewForm2.get(type).patchValue(result);
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern("^([a-zA-Z0-9 ])+$"),
          duplicateNameValidator(this.leaveComponentNames),
        ],
      ],
      code: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          //Validators.pattern('^([a-zA-Z0-9])+$'),
          duplicateNameValidator(this.leaveComponentCodes),
        ],
      ],
      description: [null, [Validators.required, Validators.maxLength(256)]],
      showLeaveDescription: [{ value: false, disabled: this.isDisabled }],
      isPaidLeave: [{ value: false, disabled: this.isDisabled }],
      isUnpaidLeave:[{ value: false, disabled: this.isDisabled }],
      isSickLeave: [{ value: false, disabled: this.isDisabled }],
      isStatutoryLeave: [{ value: false, disabled: this.isDisabled }],
      isRestrictedToGender: [{ value: false, disabled: this.isDisabled }],
      isRestrictedToMaritalStatus: [
        { value: false, disabled: this.isDisabled }, 
      ],
      createdDate: [],
      benefitCategoryId: [0, Validators.required],
      benefitTypeId: [0, Validators.required],
    });
  }

  createFormGroup2(): FormGroup {
    return this.formBuilder.group({
      eligibleDays: [null],
      eligibilityBase: [0, [Validators.required]],
      maxLeaveAtATime: [null],
      // vacationSalaryFormula: [null],
      encashBFCode: [{ value: 0, disabled: this.isEncashBf }],
      encashLimitDays: [{ value: 0, disabled: this.isEncashLimit }],
      cfLimitDays: [{ value: 0, disabled: this.isCfLimit }],
      baseType: [null, [Validators.required]],
      isIncludeLOPDays: [null, [Validators.required]],
      leaveType: [null, [Validators.required]],
      leaveCutOffType: [null, [Validators.required]],
      isAccruedLeaveAmount: [false, [Validators.required]],
      isEncash: [false, [Validators.required]],
      isCarryForward: [false, [Validators.required]],
      leaveComponentId: [null],
      leaveDeduction: [0],
      leaveEncashment: [{ value: 0, disabled: this.isEncash }],
      annualLeave: [{ value: 0, disabled: this.isAnnual }],
      id: [0],
    });
  }

  getLeaveType() {
    let categoryid = this.ViewForm.value.benefitCategoryId;
    this.leaveComponentService
      .getbenefittype(categoryid)
      .subscribe((result: any) => {
        this.leaves = result;
      });
  }

  onSubmit2() {
    this.ViewForm2.patchValue({
      leaveComponentId: this.leaveComponent.id,
      id: this.configId,
    });
    this.leaveEligiblityService.update(this.ViewForm2.getRawValue()).subscribe(
      (result: any) => {
        this.activeModal.close(true);
        this.toastr.showSuccessMessage(
          "Leave component is updated successfully!"
        );
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to update the leave component");
      }
    );
  }

  getEncashBF() {
    this.leaveEligiblityService.getBenefitType().subscribe((res) => {
      this.encashBfList = res;
    });
  }
  getLeaveSlablist(id) {
    this.leaveSlabService.getLeaveComponentDetails(id).subscribe(result => {
      this.leaveSlabDetails = result;
      this.leaveSlabDetails=this.leaveSlabDetails.sort((a, b) => a.leaveComponentName.toLowerCase().localeCompare(b.leaveComponentName.toLowerCase()));
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the LeaveSlab List Details');
    });
  }
}
