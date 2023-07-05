import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { LeaveStructureService } from '../leave-structure.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-leave-structure-create',
  templateUrl: './leave-structure-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class LeaveStructureCreateComponent implements OnInit {


  addForm: FormGroup;
  currentUserId: number;
  minDate;

  @Input() leaveStructureNames: string[];

  constructor(
    private leaveStructureService: LeaveStructureService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
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
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.leaveStructureService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Leave Structure already exists!');
      } else {
        this.activeModal.close(result);
        this.toastr.showSuccessMessage('Leave Structure is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Leave Structure');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(60),
        //Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.leaveStructureNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(256),
      ]],
      calendarYearStartDate: [new Date(Date.now()), [
        Validators.required,
      ]],
      showLeavePolicyExplanation: false,
      isCustomLeavePolicyDocumentAvailable: false,
      customDocumentPath: ['']
    });
  }
}
