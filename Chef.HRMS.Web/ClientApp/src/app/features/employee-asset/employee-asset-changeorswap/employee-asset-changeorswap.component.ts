import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-asset-changeorswap',
  templateUrl: './employee-asset-changeorswap.component.html',
})
export class EmployeeAssetChangeorswapComponent implements OnInit {
  employeeassetchangeForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    this.employeeassetchangeForm = this.createFormGroup();
  }
  onSubmit() {

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      currentAssetId: ['', [
        Validators.required,
      ]],
      currentAssetName: ['', [
        Validators.required,
      ]],
      currentMetadatas: this.formBuilder.group([]),
      newAssetType: [ '', [
        Validators.required,
      ]],
      newAssetId: ['', [
        Validators.required,
      ]],
      newAssetName: ['', [
        Validators.required,
      ]],
      newMetadatas: this.formBuilder.group([]),
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      
    });
  }

}
