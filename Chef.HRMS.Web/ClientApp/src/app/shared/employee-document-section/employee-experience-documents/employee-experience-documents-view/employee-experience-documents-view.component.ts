import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  templateUrl: "./employee-experience-documents-view.component.html",
})
export class EmployeeExperienceDocumentsViewComponent implements OnInit {
  viewForm: FormGroup;
  isDisabled = true;
  fileName = "";

  @Input() employmentDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.viewForm = this.createFormGroup();
    this.viewForm
      .get("dateOfJoining")
      .patchValue(
        this.formatDate(new Date(this.employmentDetails.dateOfJoining))
      );
    this.viewForm
      .get("dateOfRelieving")
      .patchValue(
        this.formatDate(new Date(this.employmentDetails.dateOfRelieving))
      );

    if (this.employmentDetails.fileName.length > 40) {
      this.fileName = this.employmentDetails.fileName.substr(0, 40) + "...";
    } else {
      this.fileName = this.employmentDetails.fileName;
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
      id: [this.employmentDetails.previousEmploymentId],
      employeeId: [this.employmentDetails.employeeId],
      companyName: [this.employmentDetails.companyName],
      jobTitle: [this.employmentDetails.jobTitle],
      dateOfJoining: [new Date(this.employmentDetails.dateOfJoining)],
      dateOfRelieving: [new Date(this.employmentDetails.dateOfRelieving)],
      location: [this.employmentDetails.location],
      isApproved: [true],
      document: this.formBuilder.group({
        id: [this.employmentDetails.documentId],
        name: [this.employmentDetails.fileName],
        path: [this.employmentDetails.path],
        extension: [this.employmentDetails.extension],
        size: [null],
      }),
      createdDate: [this.employmentDetails.createdDate],
    });
  }
}
