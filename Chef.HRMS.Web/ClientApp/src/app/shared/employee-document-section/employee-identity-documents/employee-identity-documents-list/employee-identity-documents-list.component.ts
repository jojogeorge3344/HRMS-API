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
import { EmployeeIdentityDocumentsViewComponent } from "../employee-identity-documents-view/employee-identity-documents-view.component";
import { DocumentViewModalComponent } from "@shared/document-view-modal/document-view-modal.component";

@Component({
  selector: "hrms-employee-identity-documents-list",
  templateUrl: "./employee-identity-documents-list.component.html",
})
export class EmployeeIdentityDocumentsListComponent implements OnInit {
  @Input() employeeId: number;
  @Input() isView: boolean;

  identityDetails: EmployeeIdentityDetails[];
  documentTypeKeys: any[] = [];
  documentTypeName
  constructor(
    private identityDetailsService: EmployeeIdentityDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    this.getDocumentTypeValue()
  }

  getIdentityDetails() {
    this.identityDetails =[]
    debugger
    this.identityDetailsService.getEmployeeId(this.employeeId).subscribe(
      (result: any) => {
        if (result.length) {
          let docList = [];
          result.forEach(data => {
            data.documentName = this.getNameValue(data.documentTypeMasterId);
            docList.push(data)
          });
          this.identityDetails = docList

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

  openEditIdentityDetails(identityDetails: EmployeeIdentityDetails) {
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

  openViewIdentityDetails(identityDetails: EmployeeIdentityDetails) {
    const modalRef = this.modalService.open(
      EmployeeIdentityDocumentsViewComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );

    modalRef.componentInstance.identityDetails = identityDetails;
  }

  deleteIdentityDetails(identityDetails) {
    debugger
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
          this.documentService.delete(identityDetails.documentId),
          this.documentUploadService.delete(documentPath),
        ]).subscribe(
          () => {
            debugger
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

  getDocumentTypeValue() {
    debugger
    this.identityDetailsService.getAllActiveDocumentsTypes()
      .subscribe((item) => {
        if (item && item.length > 0) {
          this.documentTypeKeys = item;
          this.getIdentityDetails();
        }

        // item.forEach(element => {
        //   this.identityDetails.forEach(e =>{

        //     if(element.id == e.documentTypeMasterId){

        //       this.documentTypeName=e.name
        //     }
        //   })

        // });
      }
        // this.documentTypeKeys=item.fiter(item=>{
        //   item.id==this.documentTypeMasterId
        //   this.documentTypeName=this.documentTypeKeys.name
        // })
      )
  }
  getNameValue(documentId) {
    let nameValue = "";
    this.documentTypeKeys.find((data) => {
      if (data.id == documentId) {
        nameValue = data.name;
      }
    });
    return nameValue ? nameValue : "";
  }
}
