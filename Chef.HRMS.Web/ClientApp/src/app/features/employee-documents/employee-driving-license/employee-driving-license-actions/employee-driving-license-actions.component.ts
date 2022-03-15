import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeDrivingLicenseDetailsService } from '../employee-driving-license-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { EmployeeDrivingLicenseCreateComponent } from '../employee-driving-license-create/employee-driving-license-create.component';
import { EmployeeDrivingLicenseEditComponent } from '../employee-driving-license-edit/employee-driving-license-edit.component';
import { EmployeeDrivingLicenseDetails } from '../employee-driving-license-details.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-driving-license-actions',
  templateUrl: './employee-driving-license-actions.component.html'
})
export class EmployeeDrivingLicenseActionsComponent implements OnInit, OnDestroy {

  drivingLicense: EmployeeDrivingLicenseDetails;
  document: Document;
  currentUserId: number;
  isEmpty: Boolean = true;
  isApproved: Boolean = null;
  isExpired: Boolean = null;
  canDelete: Boolean = null;
  downloadPath;

  @Output() getData = new EventEmitter<EmployeeDrivingLicenseDetails>();

  constructor(
    private drivingLicenseService: EmployeeDrivingLicenseDetailsService,
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
    this.getDrivingLicense();
  }

  getDrivingLicense() {
    this.drivingLicenseService.get(this.currentUserId).subscribe((result: any) => {
      if (result.length) {
        this.drivingLicense = result[0];
        this.isEmpty = false;

        this.getData.emit(this.drivingLicense);
        this.isApproved = result[0].isApproved;
        this.isExpired = new Date(result[0].dateOfExpiry).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
        this.canDelete = !this.isApproved || this.isExpired;
        result[0].path = result[0].path.replace('c:', 'http://127.0.0.1:8887');
        this.downloadPath = this.sanitizer.bypassSecurityTrustUrl(result[0].path);
      } else {
        this.getData.emit(null);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the driving license');
      });
  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeeDrivingLicenseCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getDrivingLicense();
      }
    });
  }

  openEdit(drivingLicense) {
    const modalRef = this.modalService.open(EmployeeDrivingLicenseEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.drivingLicense = drivingLicense;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getDrivingLicense();
      }
    });
  }

  delete(drivingLicense) {
    const documentPath = new FormData();
    documentPath.append('path', drivingLicense.path);

    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.drivingLicenseService.delete(drivingLicense.drivingLicenseId),
          this.documentService.delete(drivingLicense.documentId),
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
