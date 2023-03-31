import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeExperienceDetailsService } from "../employee-experience-details.service";
import { EmployeeExperienceDocumentsCreateComponent } from "../employee-experience-documents-create/employee-experience-documents-create.component";
import { EmployeeExperienceDocumentsEditComponent } from "../employee-experience-documents-edit/employee-experience-documents-edit.component";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";
import { DomSanitizer } from "@angular/platform-browser";
import { forkJoin } from "rxjs";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { EmployeeExperienceDetails } from "../employee-experience-details.model";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";

@Component({
  selector: "hrms-employee-experience-documents-list",
  templateUrl: "./employee-experience-documents-list.component.html",
})
export class EmployeeExperienceDocumentsListComponent implements OnInit {
  @Input() employeeId: number;

  previousEmployment: any;
  document: Document;
  isApproved: boolean = null;
  isExpired: boolean = null;
  canDelete: boolean = null;
  isEmpty = true;
  downloadPath;

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
          this.isEmpty = false;
          this.isApproved = result.isApproved;
          this.isExpired = new Date(result.dateOfExpiry) < new Date();
          this.canDelete = !this.isApproved || this.isExpired;
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the previous employment");
      }
    );
  }

  getDownloadPath(path) {
    path = path.replace("c:", "http://127.0.0.1:8887");
    return this.sanitizer.bypassSecurityTrustUrl(path);
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
            this.isEmpty = true;
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
