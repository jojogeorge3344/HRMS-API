import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.scss']
})
export class DocumentTypeEditComponent implements OnInit {
  editForm: FormGroup;
  documentTypeKeys;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();

  }

  onSubmit(){}

  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      // employeeId: this.currentUserId,
      code: ['', [
        Validators.required,
      ]],
      name: ['', [
        Validators.required,
      ]],
      documentTypeList: ['', [
        Validators.required,
      ]],
      isExpired:['', [
        Validators.required,
      ]],
      expiryBeforeDays: ['', [
        Validators.required,
      ]],
      displayOrder:[0, [
      ]], 
      documentReturnType: ['', [
        Validators.required
      ]],
      documentUpdateType: ['', [
        Validators.required
      ]],
      isApproved: [true],
     });
  }


}
