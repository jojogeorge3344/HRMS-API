import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeePANCardDetailsService } from '../employee-pan-card-details.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';
import { EmployeePANCardCreateComponent } from '../employee-pan-card-create/employee-pan-card-create.component';
import { EmployeePANCardEditComponent } from '../employee-pan-card-edit/employee-pan-card-edit.component';
import { EmployeePANCardDetails } from '../employee-pan-card-details.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-pan-card-actions',
  templateUrl: './employee-pan-card-actions.component.html',
  styles: [
  ]
})
export class EmployeePANCardActionsComponent implements OnInit, OnDestroy {

  pan: any;
  document: Document;
  currentUserId: number;
  isApproved: Boolean = null;
  canDelete: Boolean = null;
  isEmpty = true;
  downloadPath;

  @Output() getData = new EventEmitter<EmployeePANCardDetails>();


  constructor(
    private panCardService: EmployeePANCardDetailsService,
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
    this.getPANCard();
  }

  getPANCard() {
    this.panCardService.get(this.currentUserId).subscribe((result: any) => {
      if (result.length) {
        this.pan = result[0];
        this.isEmpty = false;

        this.getData.emit(this.pan);
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
      this.toastr.showErrorMessage('Unable to fetch the PAN Card');
    });
  }

  openAdd() {
    const modalRef = this.modalService.open(EmployeePANCardCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPANCard();
      }
    });
  }

  openEdit(panCard) {
    const modalRef = this.modalService.open(EmployeePANCardEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.panCard = panCard;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPANCard();
      }
    });
  }

  delete(panCard) {
    const documentPath = new FormData();
    documentPath.append('path', panCard.path);
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.panCardService.delete(panCard.panId),
          this.documentService.delete(panCard.documentId),
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
