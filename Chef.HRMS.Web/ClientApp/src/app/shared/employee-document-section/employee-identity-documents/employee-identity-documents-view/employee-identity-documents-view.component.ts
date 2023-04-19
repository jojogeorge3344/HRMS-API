import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DocumentType } from "src/app/models/common/types/documentType";
import { EmployeeIdentityDetailsService } from "../employee-identity-details.service";

@Component({
  templateUrl: "./employee-identity-documents-view.component.html",
})
export class EmployeeIdentityDocumentsViewComponent implements OnInit {
  viewForm: FormGroup;
  isDisabled = true;
  fileName = "";
  documentTypeKeys;
  documentType = DocumentType;
  @Input() identityDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private identityDetailsService: EmployeeIdentityDetailsService,

  ) {}

  ngOnInit(): void {
    this.viewForm = this.createFormGroup();
    this.documentTypeKeys = Object.keys(this.documentType)
      .filter(Number)
      .map(Number);
    this.viewForm.patchValue(this.identityDetails);
    this.viewForm
      .get("issueDate")
      .patchValue(this.formatDate(new Date(this.identityDetails.issueDate)));
    this.viewForm
      .get("expiryDate")
      .patchValue(this.formatDate(new Date(this.identityDetails.expiryDate)));

      this.identityDetailsService.getAllActiveDocumentsTypes()
      .subscribe((item)=>(
        this.documentTypeKeys=item
      ))

    if (this.identityDetails.fileName.length > 40) {
      this.fileName = this.identityDetails.fileName.substr(0, 40) + "...";
    } else {
      this.fileName = this.identityDetails.fileName;
    }
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

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.identityDetails.id],
      employeeId: this.identityDetails.employeeId,
      documentTypeMasterId: [""],
      documentNumber: [""],
      issueDate: [""],
      placeOfIssue: [""],
      expiryDate: [""],
      remarks: ["", []],
      refNum: ["", []],
      name: ["", []],
      code: ["", []],
      isExpired: [true, []],
      expiryBeforeDays: [, []],
      displayOrder: [0, []],
      documentReturnType: [4, []],
      documentUpdateType: [2, []],
      active: [],
      isApproved: [true],
      documentId: [0],
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
