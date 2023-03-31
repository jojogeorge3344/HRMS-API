import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentTypeService } from '../document-type.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '@shared/services/document.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { DocumentType } from 'src/app/models/common/types/documentType';
import { enumSelector } from "@shared/utils/common.function";
import { DocumentReturnType } from 'src/app/models/common/types/documentReturnType';
import { DocumentUpdateType } from 'src/app/models/common/types/documentUpdateType';
import { result } from 'lodash';

@Component({
  selector: 'hrms-document-type-create',
  templateUrl: './document-type-create.component.html',
  styleUrls: ['./document-type-create.component.scss']
})
export class DocumentTypeCreateComponent implements OnInit {

  addForm: FormGroup;
  documentReturnTypeKeys: number[];
  documentUpdateTypeKeys:number[];
  documentTypeKeys:number[]
  documentType = DocumentType;
  documentReturnType = DocumentReturnType;
  documentUpdateType = DocumentUpdateType

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private documentTypeService:DocumentTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.documentTypeKeys = Object.keys(this.documentType).filter(Number).map(Number);
    this.documentReturnTypeKeys = Object.keys(this.documentReturnType).filter(Number).map(Number);
    this.documentUpdateTypeKeys = Object.keys(this.documentUpdateType).filter(Number).map(Number);
  }

  onSubmit(){
    if(this.addForm.invalid){
      return
    }
    if(this.addForm.value.isExpired=="Yes"){
      this.addForm.value.isExpired=true
      }else{
        this.addForm.value.isExpired=false
      }
    this.documentTypeService.add(this.addForm.value)
    .subscribe((result)=>{
      if(result){
        this.toastr.showSuccessMessage('The Document Type added successfully!');
        this.activeModal.close('submit');
      }
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the Document Type');
          });
  }

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
