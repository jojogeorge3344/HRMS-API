import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { assetmetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetAssetsService } from '../asset-assets.service';
import { result } from 'lodash';

@Component({
  selector: 'hrms-asset-assets-create',
  templateUrl: './asset-assets-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AssetAssetsCreateComponent implements OnInit {
  assetForm: FormGroup;
  selectedValue: string = '';
  assetType: AssetType;
  currentUserId: number;
  dataType: any[]  
  date = Date.now();
  @Input() assetmetadata: assetmetadata
  @Input() assetTypeNames: AssetType;
    minDate;
    maxDate;


  constructor(
      private assestassetService: AssetAssetsService,
      private assetTypeService: AssetTypeService,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.assetForm = this.createFormGroup();
    this.getAssetType();
  }
  onSubmit(){
    this.assestassetService.add(this.assetForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset type already exists!');
      } else {
        this.toastr.showSuccessMessage('asset type added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the asset type');
    });


  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assetId: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
      ]],
      date: ['', [
        Validators.required,
      ]],
      assetType: ['', [
        Validators.required,
      ]],
      assetName: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
      ]],
      metaData: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      isActive: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      selectedValue: ['', [
        Validators.required,
      ]],
    });
  }

  getselectedvalue(){
    this.selectedValue= this.assetForm.get('selectedValue').value 
  }

  getAssetType(){
    this.assetTypeService.getAll().subscribe(result => {
      this.dataType=result;
    })
  }

  

}