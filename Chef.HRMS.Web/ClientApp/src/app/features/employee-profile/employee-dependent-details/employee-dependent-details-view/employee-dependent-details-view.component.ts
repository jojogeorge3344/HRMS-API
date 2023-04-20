import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { EmployeeDependentDetailsService } from '../employee-dependent-details.service';
import { GenderType } from '../../../../models/common/types/gendertype';
import { RelationshipType } from '../../../../models/common/types/relationshiptype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeDependentDetails } from '../employee-dependent-details.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-dependent-details-view',
  templateUrl: './employee-dependent-details-view.component.html',
  styleUrls: ['./employee-dependent-details-view.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeDependentDetailsViewComponent implements OnInit {

  @Input() currentUserId: number;
  @Input() id: number;
  @Input() dependent: EmployeeDependentDetails;
  viewForm: FormGroup;
  maxDate;
  

  genderTypes = GenderType;
  relationshipTypes = RelationshipType;

  genderTypeKeys: number[];
  relationshipTypeKeys: number[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) {
      debugger
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.relationshipTypeKeys = Object.keys(this.relationshipTypes).filter(Number).map(Number);
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    debugger
    this.currentUserId = getCurrentUserId();
    const tempObj: any = this.dependent;
    if (tempObj.phone) {
      const phone = tempObj.phone;
      const code = phone.split('-')[0].substr(1);
      tempObj.phone = tempObj.phone.split('-')[1];
      tempObj.phoneCode = code;
    }
    tempObj.dateOfBirth = new Date(tempObj.dateOfBirth);
    this.viewForm = this.createFormGroup();
   
    this.viewForm.patchValue(tempObj);
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      dateOfBirth: [null],
      name: [''],
      phone: [''],
      phoneCode: [''],
      gender: [null],
      relationship: [null],
      profession: [''],
      createdDate: []
    });
  }
}
