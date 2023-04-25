import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReturnType } from 'src/app/models/common/types/documentReturnType';
import { DocumentUpdateType } from 'src/app/models/common/types/documentUpdateType';
import { DocumentType } from 'src/app/models/common/types/documentType';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { DocumentTypeService } from '../document-type.service';

@Component({
  selector: 'hrms-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.scss']
})
export class DocumentTypeEditComponent implements OnInit {
  editForm: FormGroup;
  documentReturnTypeKeys: number[];
  documentUpdateTypeKeys:number[];
  documentTypeKeys:number[]
  documentTypeList = DocumentType;
  documentReturnType = DocumentReturnType;
  documentUpdateType = DocumentUpdateType


  @Input() documentTypeDetails;
  @Input() Code: string[];
  @Input() Name: string[];
  codeExistCheck:boolean=false

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private documentTypeService:DocumentTypeService,

  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.documentTypeDetails);
    this.documentTypeKeys = Object.keys(this.documentTypeList).filter(Number).map(Number);
    this.documentReturnTypeKeys = Object.keys(this.documentReturnType).filter(Number).map(Number);
    this.documentUpdateTypeKeys = Object.keys(this.documentUpdateType).filter(Number).map(Number);
    debugger
    if(this.editForm.value.isExpired==true){
      this.editForm.patchValue({
        isExpired:"Yes"
      })
      }else{
        this.editForm.patchValue({
          isExpired:"No"
        })
      }
      if(this.editForm.value.status==true){
        this.editForm.patchValue({
          status:"Active"
        })
        }else{
          this.editForm.patchValue({
            status:"Inactive"
          })
        }
  }

  onSubmit(){
    debugger
    console.log('id',this.documentTypeDetails.id);
    
    this.editForm.value.id=this.documentTypeDetails.id
    if(this.editForm.value.isExpired=="Yes"){
      this.editForm.value.isExpired=true
      }else{
        this.editForm.value.isExpired=false
      }
      if(this.editForm.value.status=="Active"){
        this.editForm.value.status=true
        }else{
          this.editForm.value.status=false
        }
        if(!this.codeExistCheck){
          this.documentTypeService.update( this.editForm.value)
          .subscribe((result)=>{        
                this.toastr.showSuccessMessage('The Document Type updated successfully!');
            this.activeModal.close('submit');
          },
            error => {
              console.error(error);
              this.toastr.showErrorMessage('Unable to add the Document type');
            });
          }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      // employeeId: this.currentUserId,
      code: ['', [
        Validators.required, Validators.maxLength(30),
      ]],
      name: ['', [
        Validators.required, Validators.maxLength(50),
      ]],
      documentType: ['', [
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
      status: ['', [
        Validators.required,
      ]],
      isApproved: [true],
     });
  }

  checkCodeEXist(event){
    this.documentTypeService.get(event).subscribe((result)=>{
      if(result){
        this.codeExistCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
        this.codeExistCheck=false
      }
    })
  }


}
