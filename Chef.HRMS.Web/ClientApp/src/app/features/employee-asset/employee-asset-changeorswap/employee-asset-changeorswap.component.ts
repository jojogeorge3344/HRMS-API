import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AssetAssets } from '@settings/asset/asset-assets/asset-assets.model';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { forkJoin } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-asset-changeorswap',
  templateUrl: './employee-asset-changeorswap.component.html',
})
export class EmployeeAssetChangeorswapComponent implements OnInit {
  employeeassetchangeForm: FormGroup;
  @Input() assetId;
  @Input() assetTypeId
  Astvalues: AssetAssets;
  typeMap: Map<any, any>;
  typeKeys: string[];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private assestassetService: AssetAssetsService,
    private assetMetadataService: AssetMetadataService,
  ) { }

  ngOnInit(): void {
    this.typeMap = new Map();
    this.employeeassetchangeForm = this.createFormGroup();
    this.getCurrentAssetById();
  }
  onSubmit() {

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      valueId: ['', [
        Validators.required,
      ]],
      assetName: ['', [
        Validators.required,
      ]],
      metadatas: this.formBuilder.group([]),

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


  getCurrentAssetById() {
    forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.assetTypeId),
      this.assestassetService.getAssetById(this.assetId)
    ])
      .subscribe(([metadatas, asset]) => {
        metadatas.forEach(mdata => {
          this.typeMap.set(mdata.metadata, mdata);
          (this.employeeassetchangeForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
        this.typeKeys = [...this.typeMap.keys()];
        let mdatavalue = {}
        this.typeKeys.map(key => {
          mdatavalue[key] = asset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.typeMap.get(key).id)?.value || ''
        });
        this.employeeassetchangeForm.patchValue({
          ...asset,
          metadatas: mdatavalue,
        });
        this.Astvalues = asset;
      })
  }




}
