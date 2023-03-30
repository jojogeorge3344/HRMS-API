import { Component, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbPanelChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { EmployeeIdentityDetailsService } from "./employee-identity-details.service";
import { EmployeeIdentityDocumentsCreateComponent } from "./employee-identity-documents-create/employee-identity-documents-create.component";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { DomSanitizer } from "@angular/platform-browser";
import { EmployeeIdentityDocumentsEditComponent } from "./employee-identity-documents-edit/employee-identity-documents-edit.component";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";

import { forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { EmployeeIdentityDetails } from "./model/employee-identity-details.model";
import { enumSelector } from "@shared/utils/common.function";
import { DocumentType } from "src/app/models/common/types/documentType";
import { DocumentViewModalComponent } from "@shared/document-view-modal/document-view-modal.component";

@Component({
  selector: "hrms-employee-identity-documents-container",
  templateUrl: "./employee-identity-documents-container.component.html",
})
export class EmployeeIdentityDocumentsContainerComponent implements OnInit {
  drivingLicense;
  passport;
  pan;
  uid;
  bankDetails;
  documentDetails: any;
  currentUserId: number;
  identityDetails: any;
  documentAdded = false;
  isEmpty = true;
  isExpired: Boolean = null;
  isApproved: Boolean = null;
  canDelete: Boolean = null;
  downloadPath;
  documentType = enumSelector(DocumentType);

  constructor(
    private router: Router,
    public modalService: NgbModal,
    private identityDetailsService: EmployeeIdentityDetailsService,
    private toastr: ToasterDisplayService,
    private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService
  ) {}

  ngOnInit(): void {
    // this.identityDetailsService.getAll()
    // .subscribe((result)=>{
    //   console.log('res',result);
    // })
    this.currentUserId = getCurrentUserId();
    this.getIdentityDetails();
    this.identityDetailsService
      .getAllByEmployeeId(this.currentUserId, this.identityDetails.documentId)
      .subscribe((result) => {
        console.log("res", result);
      });
  }

  // setData(documentType: string, documentData: any) {
  //   if (documentType === '1') {
  //     this.drivingLicense = documentData;
  //   }

  //   if (documentType === '2') {
  //     this.passport = documentData
  //   }

  //   if (documentType === '3') {
  //     this.pan = documentData;
  //   }

  //   if (documentType === '4') {
  //     this.uid = documentData;
  //   }

  //   if (documentType === '5') {
  //     this.bankDetails = documentData;
  //   }
  // }

  // beforeChange($event: NgbPanelChangeEvent) {

  //   if ($event.panelId === '1' && this.drivingLicense === null) {
  //     $event.preventDefault();
  //   }

  //   if ($event.panelId === '2' && this.passport === null) {
  //     $event.preventDefault();
  //   }

  //   if ($event.panelId === '3' && this.pan === null) {
  //     $event.preventDefault();
  //   }

  //   if ($event.panelId === '4' && this.uid === null) {
  //     $event.preventDefault();
  //   }

  //   if ($event.panelId === '5' && this.bankDetails === null) {
  //     $event.preventDefault();
  //   }
  // }

  openAdd() {
    const modalRef = this.modalService.open(
      EmployeeIdentityDocumentsCreateComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );
    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getIdentityDetails();
      }
    });
  }

  getIdentityDetails() {
    this.identityDetailsService.getEmployeeId(this.currentUserId).subscribe(
      (result: any) => {
        if (result.length) {
          this.identityDetails = result;
          this.identityDetails.forEach((element) => {
            element.documentType = this.getDocumentTypeValue(
              element.documentTypeList
            );
          });
          this.isEmpty = false;
          this.isApproved = result.isApproved;
          this.canDelete = !this.isApproved || this.isExpired;
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Education Details");
      }
    );
  }

  getDownloadPath(path) {
    if (path) {
      path = path.replace("c:", "http://127.0.0.1:8887");
      return this.sanitizer.bypassSecurityTrustUrl(path);
    }
  }

  openEditEducationalDetails(identityDetails: EmployeeIdentityDetails) {
    const modalRef = this.modalService.open(
      EmployeeIdentityDocumentsEditComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );

    modalRef.componentInstance.identityDetails = identityDetails;

    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getIdentityDetails();
      }
    });
  }

  deleteEducationalDetails(identityDetails) {
    console.log("identity details", identityDetails);

    const documentPath = new FormData();
    documentPath.append("path", identityDetails.path);

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage =
      "Are you sure you want to delete this document";

    modalRef.result.then((userResponse) => {
      console.log("user es", userResponse);

      if (userResponse == true) {
        forkJoin([
          this.identityDetailsService.delete(identityDetails.id),
          this.documentService.delete(identityDetails.id),
          this.documentUploadService.delete(documentPath),
        ]).subscribe(
          () => {
            this.toastr.showSuccessMessage("Document deleted successfully!");
            this.isEmpty = true;
            this.getIdentityDetails();
          },
          (error) => {
            console.error(error);
            this.toastr.showErrorMessage(
              "There is an error in deleting document"
            );
          }
        );
      }
    });
  }

  viewDocument(document) {
    console.log("document", document);
    this.identityDetailsService
      .getAllByEmployeeId(this.currentUserId, document.documentId)
      .subscribe((result) => {
        console.log("response", result);
        var url = result[0].path;
        var sanitizedurl = this.sanitizer.bypassSecurityTrustResourceUrl(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
        );
        const modalRef = this.modalService.open(DocumentViewModalComponent);
        modalRef.componentInstance.url = sanitizedurl;
      });
  }

  getDocumentTypeValue(value) {
    let data: any;
    this.documentType.find((result) => {
      if (result.value == value) {
        data = result;
      }
    });
    return data ? data.text : "-";
  }
}
