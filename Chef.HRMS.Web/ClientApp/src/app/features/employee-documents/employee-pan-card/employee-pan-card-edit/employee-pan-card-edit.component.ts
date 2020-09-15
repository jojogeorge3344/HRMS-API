import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeePANCardDetailsService } from '../employee-pan-card-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-pan-card-edit',
  templateUrl: './employee-pan-card-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeePANCardEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  documentToUpload: File = null;
  documentPath = '';
  companyName = 'Company';
  branchName = 'Branch';
  directoryName = 'c:';
  panCardDocument;
  maxDate;
  documentSave;
  fileName = '';
  isFileChanged = false;
  isDisabled = true;

  @Input() panCard: any;

  constructor(
    private panCardService: EmployeePANCardDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\PANCard\\${this.currentUserId}\\`;
    this.editForm = this.createFormGroup();
    if (this.panCard.fileName.length > 40) {
      this.fileName = this.panCard.fileName.substr(0, 40) + '...';
    } else {
      this.fileName = this.panCard.fileName;
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
    documentPath.append('path', this.panCard.path);

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
      this.editForm.patchValue({ document: { id: this.panCard.documentId } });
      forkJoin([
        this.panCardService.update(this.editForm.value),
        this.documentService.update(this.editForm.value.document),
        this.documentUploadService.upload(this.documentSave)
      ])
        .subscribe(() => {
          this.toastr.showSuccessMessage('PAN Card updated successfully!');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('There is an error in updating PAN Card');
          });
    } else {
      this.panCardService.update(this.editForm.value).subscribe((result: any) => {
        this.toastr.showSuccessMessage('PAN Card updated successfully!');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('There is an error in updating PAN Card');
        });
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.panCard.panId],
      employeeId: [this.panCard.employeeId],
      name: [this.panCard.name, [
        Validators.required,
        Validators.maxLength(32),
      ]],
      fatherName: [this.panCard.fatherName, [
        Validators.maxLength(32),
        Validators.required
      ]],
      number: [this.panCard.number, [
        Validators.maxLength(16),
        Validators.required
      ]],
      dateOfBirth: [new Date(this.panCard.dateOfBirth), [
        Validators.required,
      ]],
      document: this.formBuilder.group({
        id: [this.panCard.documentId],
        name: [this.panCard.name],
        path: [this.panCard.path],
        extension: [this.panCard.extension],
        size: [null],
      }),
      createdBy: [this.panCard.createdBy],
      createdDate: [this.panCard.createdDate],
      modifiedBy: [this.currentUserId]
    });
  }
}
