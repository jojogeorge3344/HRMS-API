import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { DomSanitizer } from "@angular/platform-browser";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";

import { forkJoin } from "rxjs";
import { enumSelector } from "@shared/utils/common.function";
import { DocumentType } from "src/app/models/common/types/documentType";
import { EmployeeIdentityDetails } from "../employee-identity-details.model";
import { EmployeeIdentityDetailsService } from "../employee-identity-details.service";
import { EmployeeIdentityDocumentsCreateComponent } from "../employee-identity-documents-create/employee-identity-documents-create.component";
import { EmployeeIdentityDocumentsEditComponent } from "../employee-identity-documents-edit/employee-identity-documents-edit.component";
import { DocumentViewModalComponent } from "@shared/document-view-modal/document-view-modal.component";

@Component({
  selector: "hrms-employee-identity-documents-list",
  templateUrl: "./employee-identity-documents-list.component.html",
})
export class EmployeeIdentityDocumentsListComponent implements OnInit {
  @Input() employeeId: number;
  @Input() isView: boolean;

  identityDetails: EmployeeIdentityDetails[];
  documentType = enumSelector(DocumentType);

  constructor(
    private identityDetailsService: EmployeeIdentityDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) {}

  ngOnInit(): void {
    this.getIdentityDetails();
  }

  getIdentityDetails() {
    this.identityDetailsService.getEmployeeId(this.employeeId).subscribe(
      (result: any) => {
        if (result.length) {
          this.identityDetails = result;
          this.identityDetails.forEach((element) => {
            element.documentType = this.getDocumentTypeValue(
              element.documentTypeList
            );
          });
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

  openAdd() {
    const modalRef = this.modalService.open(
      EmployeeIdentityDocumentsCreateComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );
    modalRef.componentInstance.employeeId = this.employeeId;

    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getIdentityDetails();
      }
    });
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
    const documentPath = new FormData();
    documentPath.append("path", identityDetails.path);

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage =
      "Are you sure you want to delete this document";

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.identityDetailsService.delete(identityDetails.id),
          this.documentService.delete(identityDetails.id),
          this.documentUploadService.delete(documentPath),
        ]).subscribe(
          () => {
            this.toastr.showSuccessMessage("Document deleted successfully!");
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
      .getAllByEmployeeId(this.employeeId, document.documentId)
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
