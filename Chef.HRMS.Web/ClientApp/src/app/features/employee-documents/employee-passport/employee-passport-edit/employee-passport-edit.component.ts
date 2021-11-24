import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeePassportDetailsService } from '../employee-passport-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-passport-edit',
  templateUrl: './employee-passport-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeePassportEditComponent implements OnInit {

  editForm: FormGroup;
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
  documentSave;
  fileName = '';
  isFileChanged = false;
  isDisabled = true;

  @Input() passport: any;

  constructor(
    private passportService: EmployeePassportDetailsService,
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
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\Passport\\${this.currentUserId}\\`;
    this.editForm = this.createFormGroup();
    if (this.passport.fileName.length > 40) {
      this.fileName = this.passport.fileName.substr(0, 40) + '...';
    } else {
      this.fileName = this.passport.fileName;
    }
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
      (this.editForm.get('document') as FormGroup).controls.extension.setErrors({ filetype: true });
      return;
    }

    if (this.documentToUpload.size >= 2097152) {
      (this.editForm.get('document') as FormGroup).controls.size.setErrors({ filesize: true });
      return;
    }

    this.fileName = this.documentToUpload.name;
    this.documentSave = new FormData();

    this.editForm.patchValue({ document: { name: this.fileName } });
    this.editForm.patchValue({ document: { path: this.documentPath + this.documentToUpload.name } });
    this.editForm.patchValue({ document: { extension: documentExtension } });
    this.editForm.patchValue({ document: { size: this.documentToUpload.size } });

    this.documentSave.append('document', this.documentToUpload);
    this.documentSave.append('path', this.documentPath);
    this.isFileChanged = true;
  }

  removeFile() {
    const documentPath = new FormData();
    documentPath.append('path', this.passport.path);

    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete current document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        if (this.editForm.get('document.id').value) {
          this.documentUploadService.delete(documentPath).subscribe((result: any) => {
            this.toastr.showSuccessMessage('Document deleted successfully!');
            this.isDisabled = false;
          },
            error => {
              console.error(error);
              this.toastr.showErrorMessage('There is an error in deleting document');
            });
        }
        this.resetFileData();
      }
    });
  }

  resetFileData() {
    this.documentToUpload = null;
    this.documentSave = null;
    this.fileName = '';
    this.editForm.get('document').reset();
  }

  onSubmit() {
    if (this.editForm.get('document.name').value === null) {
      (this.editForm.get('document') as FormGroup).controls.name.setErrors({ filename: true });
      return;
    }

    if (this.editForm.invalid) {
      return;
    }

    if (this.isFileChanged) {
      this.editForm.patchValue({ document: { id: this.passport.documentId } });
      forkJoin([
        this.passportService.update(this.editForm.value),
        this.documentService.update(this.editForm.value.document),
        this.documentUploadService.upload(this.documentSave)
      ])
        .subscribe(() => {
          this.toastr.showSuccessMessage('Passport updated successfully!');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('There is an error in updating Passport');
          });
    } else {
      this.passportService.update(this.editForm.value).subscribe(() => {
        this.toastr.showSuccessMessage('Passport updated successfully!');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('There is an error in updating Passport');
        });
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.passport.passportId],
      employeeId: [this.passport.employeeId],
      name: [this.passport.name, [
        Validators.required,
        Validators.maxLength(64),
      ]],
      fatherName: [this.passport.fatherName, [
        Validators.maxLength(32),
        Validators.required
      ]],
      motherName: [this.passport.motherName, [
        Validators.maxLength(64),
      ]],
      nationality: [this.passport.nationality, [
        Validators.maxLength(64),
      ]],
      placeOfBirth: [this.passport.placeOfBirth, [
        Validators.maxLength(32),
        Validators.required
      ]],
      placeOfIssue: [this.passport.placeOfIssue, [
        Validators.maxLength(32),
        Validators.required
      ]],
      surName: [this.passport.surName, [
        Validators.maxLength(64),
        Validators.required
      ]],
      number: [this.passport.number, [
        Validators.maxLength(16),
        Validators.required
      ]],
      address: [this.passport.address, [
        Validators.required,
        Validators.maxLength(128),
      ]],
      dateOfBirth: [new Date(this.passport.dateOfBirth), [
        Validators.required,
      ]],
      dateOfExpiry: [new Date(this.passport.dateOfExpiry), [
        Validators.required,
      ]],
      dateOfIssue: [new Date(this.passport.dateOfIssue), [
        Validators.required
      ]],
      document: this.formBuilder.group({
        id: [this.passport.documentId],
        name: [this.passport.name],
        path: [this.passport.path],
        extension: [this.passport.extension],
        size: [null],
      }),
      createdDate: [this.passport.createdDate],
    });
  }
}
