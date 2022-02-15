import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeExperienceDetailsService } from '../employee-experience-details.service';
import { EmployeeExperienceDocumentsService } from '../employee-experience-documents.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-experience-documents-create',
  templateUrl: './employee-experience-documents-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeExperienceDocumentsCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  documentToUpload: File = null;
  documentPath = '';
  companyName = 'Company';
  branchName = 'Branch';
  directoryName = 'c:';
  previousEmploymentDocument;
  minDate;
  maxDate
  documentSave;
  fileName = '';

  constructor(
    private previousEmploymentService: EmployeeExperienceDetailsService,
    private previousEmploymentDocumentService: EmployeeExperienceDocumentsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

    // const current = new Date();
    // this.minDate = {
    //   year: current.getFullYear(),
    //   month: current.getMonth() + 1,
    //   day: current.getDate()
    // };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\PreviousEmployment\\${this.currentUserId}\\`;
  }

  handleFileInput(files: FileList) {
    if (files.length == 0) {
      return;
    }

    this.resetFileData();

    this.documentToUpload = (files.item(0) as File);
    const documentExtension = this.documentToUpload.type.substring(this.documentToUpload.type.lastIndexOf('/') + 1);

    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'];
    if (!validExtensions.includes(documentExtension)) {
      (this.addForm.get('document') as FormGroup).controls.extension.setErrors({ filetype: true });
      return;
    }

    if (this.documentToUpload.size >= 2097152) {
      (this.addForm.get('document') as FormGroup).controls.size.setErrors({ filesize: true });
      return;
    }

    if (this.documentToUpload.name.length > 40) {
      this.fileName = this.documentToUpload.name.substr(0, 40) + '...';
    } else {
      this.fileName = this.documentToUpload.name;
    }

    this.documentSave = new FormData();

    this.addForm.patchValue({ document: { name: this.fileName } });
    this.addForm.patchValue({ document: { path: this.documentPath + this.documentToUpload.name } });
    this.addForm.patchValue({ document: { extension: documentExtension } });
    this.addForm.patchValue({ document: { size: this.documentToUpload.size } });

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
      (this.addForm.get('document') as FormGroup).controls.name.setErrors({ filename: true });
      return;
    }

    if (this.addForm.invalid) {
      return;
    }

    forkJoin([
      this.previousEmploymentService.add(this.addForm.value),
      this.documentService.add(this.addForm.value.document),
      this.documentUploadService.upload(this.documentSave)
    ])
      .subscribe(([previousEmployment, document]) => {
        this.previousEmploymentDocument = {
          previousEmploymentId: previousEmployment.id,
          documentId: document.id
        };
        this.previousEmploymentDocumentService.add(this.previousEmploymentDocument).subscribe((result: any) => {
          this.toastr.showSuccessMessage('Previous Employment added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('There is an error in adding Previous Employment');
          });
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('There is an error in adding Previous Employment');
        });
  }
  setMaxDate(){
    this.maxDate = {year:new Date(this.addForm.controls["dateOfRelieving"].value).getFullYear(),month:new Date(this.addForm.controls["dateOfRelieving"].value).getMonth() + 1, day:new Date(this.addForm.controls["dateOfRelieving"].value).getDate()}
  }
  setMinDate(){
    this.minDate = {year:new Date(this.addForm.controls["dateOfJoining"].value).getFullYear(),month:new Date(this.addForm.controls["dateOfJoining"].value).getMonth() + 1, day:new Date(this.addForm.controls["dateOfJoining"].value).getDate()}  
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [this.currentUserId],
      companyName: ['', [
        Validators.required,
        Validators.maxLength(64),
      ]],
      jobTitle: ['', [
        Validators.required,
        Validators.maxLength(64),
      ]],
      dateOfJoining: ['', [
        Validators.required,
      ]],
      dateOfRelieving: ['', [
        Validators.required,
      ]],
      location: ['', [
        Validators.required,
        Validators.maxLength(64)
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
