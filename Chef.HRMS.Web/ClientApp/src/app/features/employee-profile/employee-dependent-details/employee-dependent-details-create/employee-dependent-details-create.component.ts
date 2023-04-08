import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeDependentDetailsService } from '../employee-dependent-details.service';
import { GenderType } from '../../../../models/common/types/gendertype';
import { RelationshipType } from '../../../../models/common/types/relationshiptype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import * as _ from 'lodash';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './employee-dependent-details-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeDependentDetailsCreateComponent implements OnInit {

  @Input() currentUserId: number;
  @Input() dependents:any[];
  addForm: FormGroup;

  genderTypes = GenderType;
  relationshipTypes = RelationshipType;

  genderTypeKeys: number[];
  relationshipTypeKeys: number[];
  maxDate;
  selectValueRelation: any[];
  allRelationshipTypeKeys: number[];
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private dependentService: EmployeeDependentDetailsService,
    public activeModal: NgbActiveModal) {
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.relationshipTypeKeys = Object.keys(this.relationshipTypes).filter(Number).map(Number);
    this.allRelationshipTypeKeys = Object.keys(this.relationshipTypes).filter(Number).map(Number);
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.currentUserId = getCurrentUserId();
    console.log("depend",this.dependents);

    this.selectValueRelation = [];
    // this.selectValueRelation=this.dependents.filter(y=>{if(y.relationship!==4  || y.relationship!==5 || y.relationship!==6){return y.relationship}})
    // console.log("relation",this.selectValueRelation);
    

    this.dependents.filter(y=>{
      this.selectValueRelation.push(
        y.relationship
      )
      console.log("selected val",this.selectValueRelation);

    });
    this.relationshipTypeKeys= _.difference(this.allRelationshipTypeKeys, this.selectValueRelation);
    console.log(this.allRelationshipTypeKeys,this.relationshipTypeKeys);
    
    this.allRelationshipTypeKeys.map((item:any)=>{
      if(item==4  || item==5 || item==6){
        this.relationshipTypeKeys.push(item)
      }

    })
    this.relationshipTypeKeys=_.uniq(this.relationshipTypeKeys)
    console.log("keys",this.relationshipTypeKeys);
    
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      dateOfBirth: [null, [
        Validators.required,
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern("[0-9 ]{10}")
      ]],
      phoneCode: ['',[
        Validators.required,
        Validators.pattern("[0-9 ]{2}")
      ]],
      gender: [null, [
        Validators.required,
      ]],
      relationship: [null, [
        Validators.required,
      ]],
      profession: ['', [Validators.maxLength(32),

      ]],
    });
  }
  onSubmit() {
    const addDependentForm = this.addForm.value;

    if (addDependentForm.phoneCode && addDependentForm.phone) {
      addDependentForm.phone = `+${addDependentForm.phoneCode}-${addDependentForm.phone}`;
    } else {
      addDependentForm.phone = '';
    }

    addDependentForm.employeeId = this.currentUserId;

    this.dependentService.insert(addDependentForm).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Dependent already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Dependent is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Dependent');
      });

  }

}
