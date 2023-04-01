import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  templateUrl: "./employee-educational-documents-view.component.html",
})
export class EmployeeEducationalDocumentsViewComponent implements OnInit {
  viewForm: FormGroup;
  isDisabled = true;
  fileName = "";

  @Input() educationDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.viewForm = this.createFormGroup();
    this.viewForm
      .get("yearOfCompletion")
      .patchValue(
        this.formatDate(new Date(this.educationDetails.yearOfCompletion))
      );
    this.viewForm
      .get("yearOfJoining")
      .patchValue(
        this.formatDate(new Date(this.educationDetails.yearOfJoining))
      );

    if (this.educationDetails.fileName.length > 40) {
      this.fileName = this.educationDetails.fileName.substr(0, 40) + "...";
    } else {
      this.fileName = this.educationDetails.fileName;
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
      id: [this.educationDetails.educationId],
      employeeId: [this.educationDetails.employeeId],
      degree: [this.educationDetails.degree],
      percentage: [this.educationDetails.percentage],
      specialization: [this.educationDetails.specialization],
      university: [this.educationDetails.university],
      yearOfCompletion: [new Date(this.educationDetails.yearOfCompletion)],
      yearOfJoining: [new Date(this.educationDetails.yearOfJoining)],
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
