import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { forkJoin } from "rxjs";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";

import { getCurrentUserId } from "@shared/utils/utils.functions";
import { EmployeeEducationalDetailsService } from "../employee-educational-details.service";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";

@Component({
  selector: "hrms-employee-educational-documents-edit",
  templateUrl: "./employee-educational-documents-edit.component.html",
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class EmployeeEducationalDocumentsEditComponent implements OnInit {
  editForm: FormGroup;
  currentUserId: number;
  documentToUpload: File = null;
  documentPath = "";
  companyName = "Company";
  branchName = "Branch";
  directoryName = "c:";
  educationDocument;
  minDate;
  maxDate;
  documentSave;
  isFileChanged = false;
  isDisabled = true;
  fileName = "";

  @Input() educationDetails: any;

  constructor(
    private educationService: EmployeeEducationalDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\Education\\${this.currentUserId}\\`;
    this.editForm = this.createFormGroup();
    this.setMinDate();
    this.setMaxDate();
    console.log("ed dtls", this.educationDetails);

    if (this.educationDetails.fileName.length > 40) {
      this.fileName = this.educationDetails.fileName.substr(0, 40) + "...";
    } else {
      this.fileName = this.educationDetails.fileName;
    }
  }

  handleFileInput(files: FileList) {
    if (files.length == 0) {
      return;
    }

    this.resetFileData();

    this.documentToUpload = files.item(0) as File;
    const documentExtension = this.documentToUpload.type.substring(
      this.documentToUpload.type.lastIndexOf("/") + 1
    );

    const validExtensions = ["pdf", "png", "jpg", "jpeg", "doc", "docx"];
    if (!validExtensions.includes(documentExtension)) {
      (this.editForm.get("document") as FormGroup).controls.extension.setErrors(
        { filetype: true }
      );
      return;
    }

    if (this.documentToUpload.size >= 2097152) {
      (this.editForm.get("document") as FormGroup).controls.size.setErrors({
        filesize: true,
      });
      return;
    }

    this.fileName = this.documentToUpload.name;
    this.documentSave = new FormData();

    this.editForm.patchValue({ document: { name: this.fileName } });
    this.editForm.patchValue({
      document: { path: this.documentPath + this.documentToUpload.name },
    });
    this.editForm.patchValue({ document: { extension: documentExtension } });
    this.editForm.patchValue({
      document: { size: this.documentToUpload.size },
    });

    this.documentSave.append("document", this.documentToUpload);
    this.documentSave.append("path", this.documentPath);
    this.isFileChanged = true;
  }

  removeFile() {
    const documentPath = new FormData();
    documentPath.append("path", this.educationDetails.path);

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage =
      "Are you sure you want to delete current document";

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        if (this.editForm.get("document.id").value) {
          this.documentUploadService.delete(documentPath).subscribe(
            (result: any) => {
              this.toastr.showSuccessMessage("Document deleted successfully!");
              this.isDisabled = false;
            },
            (error) => {
              console.error(error);
              this.toastr.showErrorMessage(
                "There is an error in deleting document"
              );
            }
          );
        }
        this.resetFileData();
      }
    });
  }

  resetFileData() {
    this.documentToUpload = null;
    this.documentSave = null;
    this.fileName = "";
    this.editForm.get("document").reset();
  }

  onSubmit() {
    if (this.editForm.get("document.name").value === null) {
      (this.editForm.get("document") as FormGroup).controls.name.setErrors({
        filename: true,
      });
      return;
    }

    if (this.editForm.invalid) {
      return;
    }
    if (this.isFileChanged) {
      this.editForm.patchValue({
        document: { id: this.educationDetails.documentId },
      });
      forkJoin([
        this.educationService.update(this.editForm.value),
        this.documentService.update(this.editForm.value.document),
        this.documentUploadService.upload(this.documentSave),
      ]).subscribe(
        (result) => {
          this.toastr.showSuccessMessage(
            "Education Details updated successfully!"
          );
          this.activeModal.close("submit");
        },
        (error) => {
          console.error(error);
          this.toastr.showErrorMessage(
            "There is an error in updating Education Details"
          );
        }
      );
    } else {
      this.educationService.update(this.editForm.value).subscribe(
        (result: any) => {
          this.toastr.showSuccessMessage(
            "Education Details updated successfully!"
          );
          this.activeModal.close("submit");
        },
        (error) => {
          console.error(error);
          this.toastr.showErrorMessage(
            "There is an error in updating Education Details"
          );
        }
      );
    }
  }

  setMaxDate() {
    this.maxDate = {
      year: new Date(
        this.editForm.controls["yearOfCompletion"].value
      ).getFullYear(),
      month:
        new Date(this.editForm.controls["yearOfCompletion"].value).getMonth() +
        1,
      day: new Date(this.editForm.controls["yearOfCompletion"].value).getDate(),
    };
  }

  setMinDate() {
    this.minDate = {
      year: new Date(
        this.editForm.controls["yearOfJoining"].value
      ).getFullYear(),
      month:
        new Date(this.editForm.controls["yearOfJoining"].value).getMonth() + 1,
      day: new Date(this.editForm.controls["yearOfJoining"].value).getDate(),
    };
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.educationDetails.educationId],
      employeeId: [this.educationDetails.employeeId],
      degree: [
        this.educationDetails.degree,
        [Validators.required, Validators.maxLength(32)],
      ],
      percentage: [
        this.educationDetails.percentage,
        [Validators.max(100), Validators.required],
      ],
      specialization: [
        this.educationDetails.specialization,
        [Validators.maxLength(32)],
      ],
      university: [
        this.educationDetails.university,
        [Validators.required, Validators.maxLength(32)],
      ],
      yearOfCompletion: [
        new Date(this.educationDetails.yearOfCompletion),
        [Validators.required],
      ],
      yearOfJoining: [
        new Date(this.educationDetails.yearOfJoining),
        [Validators.required],
      ],
      isApproved: [this.educationDetails.isApproved],
      document: this.formBuilder.group({
        id: [this.educationDetails.documentId],
        name: [this.educationDetails.fileName],
        path: [this.educationDetails.path],
        extension: [this.educationDetails.extension],
        size: [null],
      }),
      createdDate: [this.educationDetails.createdDate],
    });
  }
}
