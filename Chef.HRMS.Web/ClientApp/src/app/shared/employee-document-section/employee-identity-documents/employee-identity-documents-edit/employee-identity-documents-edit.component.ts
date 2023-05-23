import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { forkJoin } from "rxjs";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";
import { EmployeeIdentityDetailsService } from "../employee-identity-details.service";

import { getCurrentUserId } from "@shared/utils/utils.functions";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { DocumentType } from "src/app/models/common/types/documentType";
@Component({
  selector: "hrms-employee-identity-documents-edit",
  templateUrl: "./employee-identity-documents-edit.component.html",
  styleUrls: ["./employee-identity-documents-edit.component.scss"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class EmployeeIdentityDocumentsEditComponent implements OnInit {
  editForm: FormGroup;
  isFileChanged = false;
  currentUserId: number;
  documentToUpload: File = null;
  documentPath = "";
  companyName = "Company";
  branchName = "Branch";
  directoryName = "c:";
  educationDocument;
  documentSave;
  isDisabled = true;
  fileName = "";
  documentTypeKeys;
  documentType = DocumentType;
  minDate;
  maxDate;
  documentDetails;
  identityDetails;
  isDuplicate: boolean = false;
  docTypeName;
  constructor(
    private identityDetailsService: EmployeeIdentityDetailsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getAllEmployeeDetails();
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\Education\\${this.currentUserId}\\`;
    this.editForm = this.createFormGroup();
    debugger

    this.identityDetailsService.getAllActiveDocumentsTypes()
    .subscribe((item)=>{
      let temp={id:0,name:'test',isLastRow:true}
      // lastrow
        this.documentTypeKeys=[...item,temp];   
        let docType=item.find((item)=>this.editForm.get('documentTypeMasterId').value==item.id)
        this.docTypeName=docType
    })

    this.editForm.patchValue(this.identityDetails);
  
    this.editForm
      .get("issueDate")
      .patchValue(this.formatDate(new Date(this.identityDetails.issueDate)));
    this.editForm
      .get("expiryDate")
      .patchValue(this.formatDate(new Date(this.identityDetails.expiryDate)));
  }
  reloadDocTypes(event){
    event.stopPropagation();
    event.preventDefault();
    this.identityDetailsService.getAllActiveDocumentsTypes()
    .subscribe((item)=>{
      let temp={id:0,name:'test',isLastRow:true}
      // lastrow
      this.documentTypeKeys=[...item,temp];
    })
  } 
  selectDocType(args){
    this.editForm.patchValue({
      documentTypeMasterId:args.value.id
    })
  }
  getAllEmployeeDetails() {
    this.identityDetailsService
      .getAllByEmployeeId(
        this.identityDetails.employeeId,
        this.identityDetails.documentId
      )
      .subscribe((result) => {
        console.log("result", result);

        this.identityDetails = result[0];
        if (this.identityDetails && this.identityDetails.fileName.length > 40) {
          this.fileName = this.identityDetails.fileName.substr(0, 40) + "...";
        } else {
          this.fileName = this.identityDetails.fileName;
        }
      });
  }

  formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
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
    this.editForm.patchValue({ employeeId: this.identityDetails.employeeId });

    this.documentSave.append("document", this.documentToUpload);
    this.documentSave.append("path", this.documentPath);
    this.isFileChanged = true;
  }

  resetFileData() {
    this.documentToUpload = null;
    this.documentSave = null;
    this.fileName = "";
    this.editForm.get("document").reset();
  }

  removeFile() {
    const documentPath = new FormData();
    documentPath.append("path", this.identityDetails.path);

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage =
      "Are you sure you want to delete current document";

    modalRef.result.then((userResponse) => {
      console.log("user res", userResponse);

      if (userResponse == true) {
        if (this.editForm.get("document").value) {
          console.log("doc path", documentPath);
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

  checkDocumentNumber(documentNumber: string) {
    this.identityDetailsService
      .isDocumentCodeExist(documentNumber)
      .subscribe((result) => {
        if (result) {
          this.isDuplicate = true;
        } else {
          this.isDuplicate = false;
        }
      });
  }

  onSubmit() {
    if (this.editForm.get("document").value === null) {
      (this.editForm.get("document") as FormGroup).controls.name.setErrors({
        filename: true,
      });
      return;
    }
    if (this.editForm.invalid || this.isDuplicate) {
      console.log(this.editForm);

      return;
    }

    if (this.isFileChanged) {
      this.editForm.value.document.id = this.identityDetails.documentId;
      this.editForm.value.document.employeeId = this.identityDetails.employeeId;
      forkJoin([
        this.documentService.update(this.editForm.value.document),
        this.documentUploadService.upload(this.documentSave),
      ]).subscribe(
        ([result]) => {
          this.identityDetailsService
            .update(this.editForm.value)
            .subscribe(() => {
              this.toastr.showSuccessMessage(
                "Document Details updated successfully!"
              );
              this.activeModal.close("submit");
            });
        },
        (error) => {
          console.error(error);
          this.toastr.showErrorMessage(
            "There is an error in updating Document Details"
          );
        }
      );
    } else {
      this.identityDetailsService.update(this.editForm.value).subscribe(
        (result: any) => {
          this.toastr.showSuccessMessage(
            "Document Details updated successfully!"
          );
          this.activeModal.close("submit");
        },
        (error) => {
          console.error(error);
          this.toastr.showErrorMessage(
            "There is an error in updating document Details"
          );
        }
      );
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.identityDetails.id],
      employeeId: this.identityDetails.employeeId,
      documentTypeMasterId: ["", [Validators.required]],
      documentNumber: ["", [Validators.required]],
      issueDate: ["", [Validators.required]],
      placeOfIssue: ["", [Validators.required]],
      expiryDate: [""],
      remarks: ["", []],
      refNum: ["", []],
      name: ["hfd", []],
      code: ["dvhj", []],
      isExpired: [true, []],
      expiryBeforeDays: [5, []],
      displayOrder: [0, []],
      documentReturnType: [4, []],
      documentUpdateType: [2, []],
      active: [null,[Validators.required]],
      isApproved: [true],
      documentId: [0],
      docTypeName:[''],
      document: this.formBuilder.group({
        name: [null],
        path: [""],
        extension: ["png"],
        size: [null],
        employeeId: [this.identityDetails.employeeId],
        id: [null],
      }),
    });
  }
}
