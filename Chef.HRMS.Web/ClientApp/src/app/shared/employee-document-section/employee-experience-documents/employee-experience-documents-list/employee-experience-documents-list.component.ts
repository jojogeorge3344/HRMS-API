import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { DomSanitizer } from "@angular/platform-browser";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";

import { forkJoin } from "rxjs";
import { EmployeeExperienceDetails } from "../employee-experience-details.model";
import { EmployeeExperienceDetailsService } from "../employee-experience-details.service";
import { EmployeeExperienceDocumentsCreateComponent } from "../employee-experience-documents-create/employee-experience-documents-create.component";
import { EmployeeExperienceDocumentsEditComponent } from "../employee-experience-documents-edit/employee-experience-documents-edit.component";

@Component({
  selector: "hrms-employee-experience-documents-list",
  templateUrl: "./employee-experience-documents-list.component.html",
})
export class EmployeeExperienceDocumentsListComponent implements OnInit {
  @Input() employeeId: number;

  previousEmployment: EmployeeExperienceDetails[];

  constructor(
    private previousEmploymentService: EmployeeExperienceDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) {}

  ngOnInit(): void {
    this.getPreviousEmployment();
  }

  getPreviousEmployment() {
    this.previousEmploymentService.get(this.employeeId).subscribe(
      (result: any) => {
        if (result.length) {
          this.previousEmployment = result;
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the previous employment");
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
      EmployeeExperienceDocumentsCreateComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );

    modalRef.componentInstance.employeeId = this.employeeId;

    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getPreviousEmployment();
      }
    });
  }

  openEditPreviousEmployment(employmentDetails: EmployeeExperienceDetails) {
    const modalRef = this.modalService.open(
      EmployeeExperienceDocumentsEditComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );

    modalRef.componentInstance.employmentDetails = employmentDetails;

    modalRef.result.then((result) => {
      if (result == "submit") {
        this.getPreviousEmployment();
      }
    });
  }

  deletePreviousEmployment(previousEmployment: any) {
    const documentPath = new FormData();
    documentPath.append("path", previousEmployment.path);

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage =
      "Are you sure you want to delete this document";

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.previousEmploymentService.delete(
            previousEmployment.previousEmploymentId
          ),
          this.documentService.delete(previousEmployment.documentId),
          this.documentUploadService.delete(documentPath),
        ]).subscribe(
          () => {
            this.toastr.showSuccessMessage("Document deleted successfully!");
            this.getPreviousEmployment();
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
}
