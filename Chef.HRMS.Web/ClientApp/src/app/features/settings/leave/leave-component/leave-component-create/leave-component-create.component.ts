import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveComponentService } from '../leave-component.service';
import { GenderType } from '../../../../../models/common/types/gendertype';
import { MaritalStatusType } from '../../../../../models/common/types/maritalstatustype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';



@Component({
  selector: 'hrms-leave-component-create',
  templateUrl: './leave-component-create.component.html'
})
export class LeaveComponentCreateComponent implements OnInit {


  addForm: FormGroup;

  currentUserId: number;
  genderTypes = GenderType;
  maritalStatusTypes = MaritalStatusType;

  genderTypeKeys: number[];
  maritalStatusTypeKeys: number[];

  @Input() leaveComponentNames: string[];
  @Input() leaveComponentCodes: string[];


  constructor(
    private leaveComponentService: LeaveComponentService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusTypes).filter(Number).map(Number);

    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  toggleGender(checked) {
    if (checked) {
      this.addForm.addControl('restrictedToGender', new FormControl(null, Validators.required));
    } else {
      this.addForm.removeControl('restrictedToGender');
    }
  }

  toggleMaritalStatus(checked) {
    if (checked) {
      this.addForm.addControl('restrictedToMaritalStatus', new FormControl(null, Validators.required));
    } else {
      this.addForm.removeControl('restrictedToMaritalStatus');
    }
  }

  get name() { return this.addForm.get('name'); }

  get code() { return this.addForm.get('code'); }

  onSubmit() {
    this.leaveComponentService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Leave component already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Leave Component is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Leave Component');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.leaveComponentNames)
      ]],
      code: [null, [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('^([a-zA-Z0-9])+$'),
        duplicateNameValidator(this.leaveComponentCodes)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(256)
      ]],
      showLeaveDescription: [false],
      isPaidLeave: [false],
      isSickLeave: [false],
      isStatutoryLeave: [false],
      isRestrictedToGender: [false],
      isRestrictedToMaritalStatus: [false]
    });
  }
}
