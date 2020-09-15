import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeePassportDetailsService } from '../employee-passport-details.service';
import { EmployeePassportDocumentService } from '../employee-passport-document.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-passport-create',
  templateUrl: './employee-passport-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeePassportCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  documentToUpload: File = null;
  documentPath = '';
  companyName = 'Company';
  branchName = 'Branch';
  directoryName = 'c:';
  passportDocument;
  minDateDOB;
  maxDateDOB;
  minDateOfIssue;
  maxDateOfIssue;
  minDateOfExpiry;
  maxDateOfExpiry;
  documentSave: FormData = null;
  fileName = '';


  constructor(
    private passportService: EmployeePassportDetailsService,
    private passportDocumentService: EmployeePassportDocumentService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

    const current = new Date();

    this.minDateDOB = this.minDateOfIssue = { year: 1900, month: 1, day: 1 };
    this.maxDateOfIssue = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.maxDateDOB = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.minDateOfExpiry = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate() + 1
    };
    this.maxDateOfExpiry = {
      year: current.getFullYear() + 30,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  onDOBSelection(date: NgbDate) {
    this.minDateOfIssue = date;
  }

  onDOISelection(date: NgbDate) {
    this.minDateOfExpiry = date;
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\Passport\\${this.currentUserId}\\`;
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
      (this.addForm.get('document') as  FormGroup).controls.extension.setErrors({ filetype: true });
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
      this.passportService.add(this.addForm.value),
      this.documentService.add(this.addForm.value.document),
      this.documentUploadService.upload(this.documentSave)
    ])
      .subscribe(([passport, document]) => {
        this.passportDocument = {
          passportId: passport.id,
          documentId: document.id
        };

        this.passportDocumentService.add(this.passportDocument).subscribe((result: any) => {
          this.toastr.showSuccessMessage('Passport added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('There is an error in adding Passport');
          });
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('There is an error in adding Passport');
        });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [this.currentUserId],
      name: ['', [
        Validators.maxLength(64),
        Validators.required
      ]],
      fatherName: ['', [
        Validators.maxLength(32),
        Validators.required
      ]],
      motherName: ['', [
        Validators.maxLength(64),
      ]],
      nationality: ['', [
        Validators.maxLength(64),
      ]],
      placeOfBirth: ['', [
        Validators.maxLength(32),
        Validators.required
      ]],
      placeOfIssue: ['', [
        Validators.maxLength(32),
        Validators.required
      ]],
      surName: ['', [
        Validators.maxLength(64),
        Validators.required
      ]],
      number: ['', [
        Validators.maxLength(16),
        Validators.required
      ]],
      address: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      dateOfBirth: ['', [
        Validators.required,
      ]],
      dateOfExpiry: ['', [
        Validators.required
      ]],
      dateOfIssue: ['', [
        Validators.required
      ]],
      document: this.formBuilder.group({
        name: [null],
        path: [''],
        extension: ['png'],
        size: [null],
      }),
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }
}
