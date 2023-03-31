import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { EmployeeEducationalDocumentsCreateComponent } from '../employee-educational-documents-create/employee-educational-documents-create.component';
import { EmployeeEducationalDocumentsEditComponent } from '../employee-educational-documents-edit/employee-educational-documents-edit.component';
import { EmployeeEducationalDetailsService } from '../employee-educational-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeEducationalDetails } from '../employee-educational-details.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-educational-documents-list',
  templateUrl: './employee-educational-documents-list.component.html',
})
export class EmployeeEducationalDocumentsListComponent implements OnInit {

  educationDetails: any;
  currentUserId: number;
  documentAdded = false;
  isEmpty = true;
  isExpired: Boolean = null;
  isApproved: Boolean = null;
  canDelete: Boolean = null;
  downloadPath;


  constructor(
    private router: Router,
    private employeeEducationalDetailsService: EmployeeEducationalDetailsService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getEducationalDetails();
  }

  getEducationalDetails() {
    this.employeeEducationalDetailsService.getByEmployeeId(this.currentUserId).subscribe((result: any) => {
      if (result.length) {
        this.educationDetails = result;
        console.log('ed details',this.educationDetails);
        
        this.isEmpty = false;
        this.isApproved = result.isApproved;
        this.canDelete = !this.isApproved || this.isExpired;
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Education Details');
      });
  }

  getDownloadPath(path) {
    path = path.replace('c:', 'http://127.0.0.1:8887');
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeeEducationalDocumentsCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getEducationalDetails();
      }
    });
  }

  openEditEducationalDetails(educationDetails: EmployeeEducationalDetails) {
    const modalRef = this.modalService.open(EmployeeEducationalDocumentsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.educationDetails = educationDetails;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getEducationalDetails();
      }
    });
  }

  deleteEducationalDetails(educationDetails) {
    const documentPath = new FormData();
    documentPath.append('path', educationDetails.path);

    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.employeeEducationalDetailsService.delete(educationDetails.educationId),
          this.documentService.delete(educationDetails.documentId),
          this.documentUploadService.delete(documentPath)
        ])
          .subscribe(() => {
            this.toastr.showSuccessMessage('Document deleted successfully!');
            this.isEmpty = true;
            this.getEducationalDetails();
          },
            error => {
              console.error(error);
              this.toastr.showErrorMessage('There is an error in deleting document');
            });
      }
    });
  }

  // deleteEducationalDetails(educationDetails) {
  //   let documentPath = new FormData();
  //   documentPath.append('path', educationDetails.path);

  //   const modalRef = this.modalService.open(ConfirmModalComponent,
  //     { centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.confirmationMessage = "Are you sure you want to delete this document";

  //   modalRef.result.then((userResponse) => {
  //     if (userResponse == true) {
  //       forkJoin(
  //         this.educationService.delete(educationDetails.educationId),
  //         this.documentService.delete(educationDetails.documentId),
  //         this.documentUploadService.delete(documentPath)
  //       )
  //       .subscribe(() => {
  //         this.toastr.showSuccessMessage('Education Document deleted successfully!');
  //         this.isEmpty = true;
  //         this.getEducationalDetails();
  //       },
  //       error => {
  //         console.error(error);
  //         this.toastr.showErrorMessage('There is an error in deleting document');
  //       });
  //     }
  //   });
  // }

}
