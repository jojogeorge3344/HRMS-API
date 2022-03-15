import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeUIDDetailsService } from '../employee-uid-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { EmployeeUIDCreateComponent } from '../employee-uid-create/employee-uid-create.component';
import { EmployeeUIDEditComponent } from '../employee-uid-edit/employee-uid-edit.component';
import { EmployeeUIDDetails } from '../employee-uid-details.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-uid-actions',
  templateUrl: './employee-uid-actions.component.html'
})
export class EmployeeUIDActionsComponent implements OnInit, OnDestroy {

  uid: any;
  document: Document;
  currentUserId: number;
  isApproved: Boolean = null;
  canDelete: Boolean = null;
  isEmpty = true;
  downloadPath;

  @Output() getData = new EventEmitter<EmployeeUIDDetails>();


  constructor(
    private uniqueIdentificationDetailService: EmployeeUIDDetailsService,
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
    this.getUniqueIdentificationDetail();
  }

  getUniqueIdentificationDetail() {
    this.uniqueIdentificationDetailService.get(this.currentUserId).subscribe((result: any) => {
      if (result.length) {
        this.uid = result[0];
        this.isEmpty = false;

        this.getData.emit(this.uid);

        this.isApproved = result[0].isApproved;
        this.canDelete = !this.isApproved;
        result[0].path = result[0].path.replace('c:', 'http://127.0.0.1:8887');
        this.downloadPath = this.sanitizer.bypassSecurityTrustUrl(result[0].path);
      } else {
        this.getData.emit(null);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the unique identification document');
      });
  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeeUIDCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getUniqueIdentificationDetail();
      }
    });
  }

  openEdit(uniqueIdentificationDetail) {
    const modalRef = this.modalService.open(EmployeeUIDEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.uniqueIdentificationDetail = uniqueIdentificationDetail;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getUniqueIdentificationDetail();
      }
    });
  }

  delete(uniqueIdentificationDetail) {
    const documentPath = new FormData();
    documentPath.append('path', uniqueIdentificationDetail.path);

    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.uniqueIdentificationDetailService.delete(uniqueIdentificationDetail.uniqueIdentificationDetailId),
          this.documentService.delete(uniqueIdentificationDetail.documentId),
          this.documentUploadService.delete(documentPath)
        ])
          .subscribe(() => {
            this.toastr.showSuccessMessage('Document deleted successfully!');
            this.isEmpty = true;
            this.getData.emit(null);
          },
            error => {
              console.error(error);
              this.toastr.showSuccessMessage('There is an error in deleting document');
            });
      }
    });
  }

}
