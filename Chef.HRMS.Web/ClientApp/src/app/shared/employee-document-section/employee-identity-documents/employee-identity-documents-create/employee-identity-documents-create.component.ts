import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { forkJoin } from "rxjs";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DocumentService } from "@shared/services/document.service";
import { DocumentUploadService } from "@shared/services/document-upload.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { EmployeeIdentityDetailsService } from "../employee-identity-details.service";
import { EmployeeIdentityDocumentsService } from "../employee-identity-documents.service";
import { result } from "lodash";
import { DocumentType } from "src/app/models/common/types/documentType";
import { getCurrentUserId } from "@shared/utils/utils.functions";

@Component({
  selector: "hrms-employee-identity-documents-create",
  templateUrl: "./employee-identity-documents-create.component.html",
  styleUrls: ["./employee-identity-documents-create.component.scss"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class EmployeeIdentityDocumentsCreateComponent implements OnInit {
  @Input() employeeId: number;
  addForm: FormGroup;
  currentUserId: number;
  isDisabled = false;
  minDateOfIssue;
  identityDocument;
  documentSave;
  maxDateOfIssue;
  minDateOfExpiry;
  maxDateOfExpiry;
  documentToUpload: File = null;
  fileName: string;
  documentPath = "";
  documentTypeKeys;
  documentType = DocumentType;
  directoryName = "c:";
  companyName = "Company";
  branchName = "Branch";
  isDuplicate: boolean = false;
  @Output() identityDetailsForm = new EventEmitter<boolean>();

  constructor(
    private identityDetailsService: EmployeeIdentityDetailsService,
    private identityDocumentsService: EmployeeIdentityDocumentsService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.identityDetailsService.getAll().subscribe((result) => {});
    console.log("doc type", this.documentType);

    // this.documentTypeKeys = Object.keys(this.documentType)
    //   .filter(Number)
    //   .map(Number);
     this.identityDetailsService.getAllActiveDocumentsTypes()
    .subscribe((item)=>{
      let temp={id:0,name:'test',isLastRow:true}
      // lastrow
      this.documentTypeKeys=[...item,temp];
    })
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\Education\\${this.currentUserId}\\`;
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
  removeFile() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.confirmationMessage =
      "Are you sure you want to delete this document";

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.resetFileData();
      }
    });
  }

  resetFileData() {
    this.documentToUpload = null;
    this.documentSave = null;
    this.fileName = "";
    this.addForm.get("document").reset();
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
    debugger
    console.log("doc save", this.documentSave);
    const identityDetailsForm = this.addForm.value;
    this.identityDetailsForm.emit(identityDetailsForm);

    if (this.addForm.get("document.name").value === null) {
      (this.addForm.get("document") as FormGroup).controls.name.setErrors({
        filename: true,
      });
      return;
    }

    if (this.addForm.invalid || this.isDuplicate) {
      return;
    }

    forkJoin([
      this.documentService.add(this.addForm.value.document),
      this.documentUploadService.upload(this.documentSave),
    ]).subscribe(
      ([document]) => {
        debugger;

        this.identityDocument = {
          documentId: document,
        };
        this.addForm.patchValue({
          documentId: document,
        });
        this.identityDetailsService.add(this.addForm.value).subscribe(
          (result: any) => {
            this.toastr.showSuccessMessage("Document Added successfully");
            this.activeModal.close("submit");
          },
          (error) => {
            console.error(error);
            this.toastr.showErrorMessage(
              "There is an error in document Details"
            );
          }
        );
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage(
          "There is an error in adding document Details"
        );
      }
    );
  }

  handleFileInput(files: FileList) {
    if (files.length == 0) {
      return;
    }

    this.documentToUpload = files.item(0) as File;
    const documentExtension = this.documentToUpload.type.substring(
      this.documentToUpload.type.lastIndexOf("/") + 1
    );

    if (this.documentToUpload.size >= 2097152) {
      (this.addForm.get("document") as FormGroup).controls.size.setErrors({
        filesize: true,
      });
      return;
    }

    const validExtensions = ["pdf", "png", "jpg", "jpeg", "doc", "docx"];
    if (!validExtensions.includes(documentExtension)) {
      (this.addForm.get("document") as FormGroup).controls.extension.setErrors({
        filetype: true,
      });
      return;
    }

    this.fileName = this.documentToUpload.name;
    this.documentSave = new FormData();

    this.addForm.patchValue({ document: { name: this.fileName } });
    this.addForm.patchValue({
      document: { path: this.documentPath + this.documentToUpload.name },
    });
    this.addForm.patchValue({ document: { extension: documentExtension } });
    this.addForm.patchValue({ document: { size: this.documentToUpload.size } });

    this.documentSave.append("document", this.documentToUpload);
    this.documentSave.append("path", this.documentPath);
    console.log("path", this.documentPath);
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: this.employeeId,
      documentTypeMasterId: ["", [Validators.required]],
      documentNumber: [null, [Validators.required]],
      issueDate: ["", [Validators.required]],
      placeOfIssue: ["", [Validators.required]],
      expiryDate: [
        "",
        [
          // Validators.required
        ],
      ],
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

      document: this.formBuilder.group({
        name: [null],
        path: [""],
        extension: ["png"],
        size: [null],
        employeeId: [this.employeeId],
      }),
    });
  }
}
