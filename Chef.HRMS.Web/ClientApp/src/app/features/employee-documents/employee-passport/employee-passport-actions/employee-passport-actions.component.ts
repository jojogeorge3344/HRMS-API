import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeePassportDetailsService } from '../employee-passport-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { EmployeePassportCreateComponent } from '../employee-passport-create/employee-passport-create.component';
import { EmployeePassportEditComponent } from '../employee-passport-edit/employee-passport-edit.component';
import { EmployeePassportDetails } from '../employee-passport-details.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-employee-passport-actions',
  templateUrl: './employee-passport-actions.component.html'
})
export class EmployeePassportActionsComponent implements OnInit, OnDestroy {

  passport: any;
  document: Document;
  currentUserId: number;
  isApproved: Boolean = null;
  isExpired: Boolean = null;
  canDelete: Boolean = null;
  isEmpty = true;
  downloadPath;

  @Output() getData = new EventEmitter<EmployeePassportDetails>();

  constructor(
    private passportService: EmployeePassportDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getPassport();
  }

  getPassport() {
    this.passportService.get(this.currentUserId).subscribe((result: any) => {
      if (result.length) {
        this.passport = result[0];
        this.isEmpty = false;

        this.getData.emit(this.passport);

        this.isApproved = result[0].isApproved;
        this.isExpired = new Date(result[0].dateOfExpiry).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
        this.canDelete = !this.isApproved || this.isExpired;
        result[0].path = result[0].path.replace('c:', 'http://127.0.0.1:8887');
        this.downloadPath = this.sanitizer.bypassSecurityTrustUrl(result[0].path);
        console.log(this.passport);

      } else {
        this.getData.emit(null);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the passport');
      });
  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeePassportCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPassport();
      }
    });
  }

  openEdit(passport) {
    const modalRef = this.modalService.open(EmployeePassportEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.passport = passport;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPassport();
      }
    });
  }

  delete(passport) {
    const documentPath = new FormData();
    documentPath.append('path', passport.path);
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.passportService.delete(passport.passportId),
          this.documentService.delete(passport.documentId),
          this.documentUploadService.delete(documentPath)
        ])
          .subscribe(() => {
            this.toastr.showSuccessMessage('Document deleted successfully!');
            this.isEmpty = true;
            this.getData.emit(null);
          },
            error => {
              console.error(error);
              this.toastr.showErrorMessage('There is an error in deleting document');
            });
      }
    });
  }

}
