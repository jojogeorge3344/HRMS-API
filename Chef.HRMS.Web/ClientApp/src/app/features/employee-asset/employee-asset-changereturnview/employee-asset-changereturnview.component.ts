import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetAssets } from '@settings/asset/asset-assets/asset-assets.model';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { forkJoin } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-changereturnview',
  templateUrl: './employee-asset-changereturnview.component.html',
})
export class EmployeeAssetChangereturnviewComponent implements OnInit {
//  @Input() assetId
  @Input() assetTypeId
  @Input() assetRaiseRequestId
  @Input() empid
  @Input() assetTypeName
  Astvalues: AssetAssets;
  assetId:number;
  employeeassetchangeReturnForm: FormGroup;
  typeMap: Map<any, any>;
  typeKeys: string[];

  constructor( public activeModal: NgbActiveModal,
               private formBuilder: FormBuilder,
               private toastr: ToasterDisplayService,
               private employeeAsset: EmployeAssetService,
               private assestassetService: AssetAssetsService,
               private assetMetadataService: AssetMetadataService,) 
    { }

  ngOnInit(): void {
    this.typeMap = new Map();
    this.getAssetId();
    this.employeeassetchangeReturnForm = this.createFormGroup();
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
    });
  }


  getAssetId(){
    this.employeeAsset.getAssetId(this.assetRaiseRequestId).subscribe((res) => { 
      console.log(res);
      this.assetId=res[0].assetid;
      if(res[0].assetid){
        this.getCurrentAssetById();
      }
      console.log("assetid>>>>>>",this.assetId);
      
    })
  }

  getCurrentAssetById() {
    console.log("assetid",this.assetId);
    forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.assetTypeId),
      this.assestassetService.getAssetById(this.assetId)
    ])
      .subscribe(([metadatas, asset]) => {
        console.log("metadatas",metadatas); 
        metadatas.forEach(mdata => {
          this.typeMap.set(mdata.metadata, mdata);
          (this.employeeassetchangeReturnForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
        this.typeKeys = [...this.typeMap.keys()];
        let mdatavalue = {};
        console.log("typeks",this.typeKeys);
        
        this.typeKeys.map(key => {
          mdatavalue[key] = asset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.typeMap.get(key).id)?.value || ''
        });
        this.employeeassetchangeReturnForm.patchValue({
          ...asset,
          metadatas: mdatavalue,
        });
        this.Astvalues = asset;
        
      })
  }

 

}
