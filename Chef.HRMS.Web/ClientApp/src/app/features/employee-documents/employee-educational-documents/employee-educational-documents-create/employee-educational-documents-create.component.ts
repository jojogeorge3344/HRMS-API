import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeEducationalDetailsService } from '../employee-educational-details.service';
import { EmployeeEducationalDocumentsService } from '../employee-educational-documents.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { add } from 'lodash';

@Component({
  selector: 'hrms-employee-educational-documents-create',
  templateUrl: './employee-educational-documents-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeEducationalDocumentsCreateComponent implements OnInit {

  addForm: FormGroup;
  // @Input() employeeId: any;
  currentUserId: number;
  selectedFiles: FileList;
  fileName: string;
  fileShow = false;
  isDisabled = false;

  documentToUpload: File = null;
  documentPath = '';
  companyName = 'Company';
  branchName = 'Branch';
  directoryName = 'c:';
  educationDocument;
  minDate;
  maxDate;
  documentSave;
  isFileChanged = false;

  constructor(
    private educationService: EmployeeEducationalDetailsService,
    private educationdocumentService: EmployeeEducationalDocumentsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    ) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\Education\\${this.currentUserId}\\`;
  }

  handleFileInput(files: FileList) {
    if (files.length == 0) {
      return;
    }

    this.documentToUpload = ( files.item(0) as File);
    const documentExtension = this.documentToUpload.type.substring(this.documentToUpload.type.lastIndexOf('/') + 1);

    if (this.documentToUpload.size >= 2097152) {
      (this.addForm.get('document') as FormGroup).controls.size.setErrors({filesize: true});
      return;
    }

    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'];
    if (!validExtensions.includes(documentExtension)) {
      (this.addForm.get('document') as FormGroup).controls.extension.setErrors({filetype: true});
      return;
    }

    this.fileName = this.documentToUpload.name;
    this.documentSave = new FormData();

    this.addForm.patchValue({document: {name: this.fileName}});
    this.addForm.patchValue({document: {path: this.documentPath + this.documentToUpload.name}});
    this.addForm.patchValue({document: {extension: documentExtension}});
    this.addForm.patchValue({document: {size: this.documentToUpload.size}});

    this.documentSave.append('document', this.documentToUpload);
    this.documentSave.append('path', this.documentPath);
  }

  removeFile() {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.resetFileData();
      }
    });
  }

  resetFileData() {
    this.documentToUpload = null;
    this.documentSave = null;
    this.fileName = '';
    this.addForm.get('document').reset();
  }

  onSubmit() {
    if (this.addForm.get('document.name').value === null) {
      (this.addForm.get('document') as FormGroup).controls.name.setErrors({filename: true});
      return;
    }

    if (this.addForm.invalid) {
      return;
    }
    forkJoin([
      this.educationService.add(this.addForm.value),
      this.documentService.add(this.addForm.value.document),
      this.documentUploadService.upload(this.documentSave)
    ])
    .subscribe(([education, document]) => {
      this.educationDocument = {
        educationId: education.id,
        documentId: document.id
      };
      this.educationdocumentService.add(this.educationDocument).subscribe((result: any) => {
      this.toastr.showSuccessMessage('Education Details Added successfully');
      this.activeModal.close('submit');
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in adding Education Details');
      });
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in adding Education Details');
      });
  }
  setMaxDate(){
    this.maxDate = {year:new Date(this.addForm.controls["yearOfCompletion"].value).getFullYear(),month:new Date(this.addForm.controls["yearOfCompletion"].value).getMonth() + 1, day:new Date(this.addForm.controls["yearOfCompletion"].value).getDate()}
  }
  setMinDate(){
    this.minDate = {year:new Date(this.addForm.controls["yearOfJoining"].value).getFullYear(),month:new Date(this.addForm.controls["yearOfJoining"].value).getMonth() + 1, day:new Date(this.addForm.controls["yearOfJoining"].value).getDate()}  
  console.log(this.addForm, "error");
  
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      employeeId: this.currentUserId,
      degree: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      percentage: [null, [
        Validators.required,
        Validators.max(100)
      ]],
      specialization: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      university: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      yearOfCompletion: ['', [
        Validators.required
      ]],
      yearOfJoining: ['', [
        Validators.required
      ]],
      isApproved: [true],
      document: this.formBuilder.group({
        name: [null],
        path: [''],
        extension: ['png'],
        size: [null],
      }),
     });
  }

}
