import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'hrms-employee-address-view',
  templateUrl: './employee-address-view.component.html',
  styleUrls: ['./employee-address-view.component.scss']
})
export class EmployeeAddressViewComponent implements OnInit {

  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
  }
 
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      currentAddressLine1: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      currentAddressLine2: ['', [
        Validators.maxLength(128),
      ]],
      currentCountry: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      currentPinCode: ['', [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern("^[0-9]*$")
      ]],
      currentState: ['', [
        Validators.required,
      ]],
      permanentAddressLine1: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      permanentAddressLine2: ['', [
        Validators.maxLength(128),
      ]],
      permanentCountry: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      permanentPinCode: ['', [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern("^[0-9]*$"),
      ]],
      permanentState: ['', [
        Validators.required,
      ]],
      ispermanentSameAsCurrent: [false],
      createdDate: []
     

    });
  }
}
