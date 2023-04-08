import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserVariableService } from '../user-variable-list/user-variable.service';
import { UserVariableGroup } from '../user-variable-list/user-variable.model';
import {UserVariableType} from '../user-variable.model'

@Component({
  selector: 'hrms-user-variable-edit',
  templateUrl: './user-variable-edit.component.html',
  styleUrls: ['./user-variable-edit.component.scss']
})
export class UserVariableEditComponent implements OnInit {

  addForm: FormGroup;
  userVariableType: object;
  userVariableTypeKeys: number[];
  userVariableTypeOf = UserVariableType;
  @Input() userDetails: UserVariableGroup;
  @Input() Code: string[];
  @Input() Name: string[];
  codeExistCheck:boolean=false

  constructor(
    private userVariableService:UserVariableService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.userVariableTypeKeys = Object.keys(this.userVariableTypeOf).filter(Number).map(Number);
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.userDetails);
    if(this.addForm.value.status==true){
      this.addForm.patchValue({
        status:"Active"
      })
      }else{
        this.addForm.patchValue({
          status:"InActive"
        })
      }
  }

  onSubmit() {
    this.addForm.value.id=this.userDetails.id
    if(this.addForm.value.status=="Active"){
      this.addForm.value.status=true
      }else{
        this.addForm.value.status=false
      }
    const userForm = this.addForm.value;
    if(!this.codeExistCheck){
    this.userVariableService.update(userForm).subscribe(result => {
      this.toastr.showSuccessMessage('The User Variable updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the User Variable');
      });
    }
  }
  checkCodeEXist(event){
    this.userVariableService.get(event).subscribe((result)=>{
      if(result){
        this.codeExistCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
        this.codeExistCheck=false
      }
    })
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', [
        Validators.maxLength(14),
        Validators.required,
      ]],
      name: ['', [
        Validators.maxLength(64),
        Validators.required,
      ]],
      type: [0, [
        Validators.maxLength(64),
        Validators.required,
      ]],
      status: ['', [
        Validators.required,
      ]],
    });
  }
}





