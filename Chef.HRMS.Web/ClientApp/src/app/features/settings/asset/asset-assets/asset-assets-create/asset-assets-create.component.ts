import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AssetTypeMetadata, } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetAssetsService } from '../asset-assets.service';
import { result } from 'lodash';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

@Component({
  selector: 'hrms-asset-assets-create',
  templateUrl: './asset-assets-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AssetAssetsCreateComponent implements OnInit {

  assetForm: FormGroup;
  assetType: AssetType;
  currentUserId: number;
  dataType: any[];
  date = Date.now();
  @Input() assetmetadata: AssetTypeMetadata
  @Input() assetTypeNames: AssetType;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  typeMap: Map<any, any>;
  typeKeys: string[];
  


  constructor(
      private assestassetService: AssetAssetsService,
      private assetTypeService: AssetTypeService,
      private assetMetadataService: AssetMetadataService,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.typeMap= new Map();
    this.currentUserId = getCurrentUserId();
    this.assetForm = this.createFormGroup();
    this.getAssetType();
  
    // this.getAssetMetadataById()
  }
  get metadataFormGroup () {
    return<FormGroup>this.assetForm.get('metadatas') 
  }
  onSubmit(){
    console.log(this.assetForm.value)
    let mdatavalues= {...this.assetForm.value,
      assetMetadataValues:this.typeKeys.map(key => {
        return{
          assettypeId:this.assetForm.value.assetTypeId,
          assettypeMetadataId:this.typeMap.get(key).id,
          value:this.assetForm.value.metadatas[key]
        }
      })};

      console.log(this.assetForm.value.assetMetadataValues);
      console.log(mdatavalues);
  
    this.assestassetService.add(mdatavalues).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset already exists!');
      } else {
        this.toastr.showSuccessMessage('asset added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the asset');
    });


  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      valueId: [''],
      date: [new Date(), [
        Validators.required,
      ]],
      assetTypeId: ['', [
        Validators.required,
      ]],
      assetTypeMetadataId: [ '', [
        Validators.required,
      ]],
      status: [ 5, [ ]],
      assetMetadataValues:[ ['', []]],
      assetName: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
      ]],
      isActive: [false, []],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      metadatas: this.formBuilder.group([]),
    });
  }
  


  getselectedvalue(ev){
    Object.keys(this.metadataFormGroup.controls).forEach(key => { this.metadataFormGroup.removeControl(key)});
    this.typeMap.clear();
    this.typeKeys=[];
    this.assetMetadataService.getAssetMetadataById(this.assetForm.get('assetTypeId').value).subscribe(res => {
      res.forEach(mdata => {
        // this.assetForm.patchValue({assetMetadataId:mdata.id});
        this.assetForm.get('assetTypeMetadataId').patchValue(mdata.id);
        
        this.typeMap.set(mdata.metadata,mdata);

        if(mdata.isMandatory){
            (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));
            // console.log(mdata);  
        }
        else{
          (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', []));
          // console.log(mdata);
        }        
    })
    this.typeKeys=[...this.typeMap.keys()];
  })
}
  

  getAssetType(){
    this.assetTypeService.getAll().subscribe(result => {
      this.dataType=result;
      // console.log(this.dataType);     
    })
  }

 

  

}
