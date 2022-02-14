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
import { strict } from 'assert';

@Component({
  selector: 'hrms-asset-assets-create',
  templateUrl: './asset-assets-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AssetAssetsCreateComponent implements OnInit {

  assetForm: FormGroup;
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
    this.getAssetTypeWithMetadata()
    
    // this.getAssetMetadataById()
  }
  get metadataFormGroup () {
    return<FormGroup>this.assetForm.get('metadatas') 
  }
  onSubmit(){
    console.log(this.assetForm.value)
    let mdatavalues= {...this.assetForm.getRawValue(),
      assetMetadataValues:this.typeKeys.map(key => {
        return{
          assettypeId:this.assetForm.value.assetTypeId,
          assettypeMetadataId:this.typeMap.get(key).id,
          value:this.assetForm.value.metadatas[key]
        }
      })};

      console.log(this.assetForm.value.assetMetadataValues);
      console.log(mdatavalues);
      if(this.assetForm.valid){

      
    this.assestassetService.add(mdatavalues).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Asset Already Exists!');
      } else {
        this.toastr.showSuccessMessage('Asset Added Successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to Add the Asset');
    });


  }
}

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      valueId: ['',[
        Validators.required,
        Validators.maxLength(16),
      ]],
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
      res.forEach((mdata: any)=> {
        console.log("data",mdata);
        //
        
        
        
        // this.assetForm.patchValue({assetMetadataId:mdata.id});
        this.assetForm.get('assetTypeMetadataId').patchValue(mdata.id);
        
        this.typeMap.set(mdata.metadata,mdata);

        if(mdata.isMandatory){
          switch(mdata.assetDataType){
            case 1:{
              (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$')],
            ));
            break;
            }
            case 2:{
              (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)],
            ));
            break;
            }
            case 3:{
              (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required,Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)],
            ));
            break;
            }
            

          }
            
            // console.log(mdata); 
             
        }
        else{
          switch(mdata.assetDataType){
            case 1:{
              (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.pattern('^[0-9]+$')],
            ));
            break;
            }
            case 2:{
              (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/)],
            ));
            break;
            }
            case 3:{
              (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)],
            ));
            break;
            }
            

          }
         // (this.assetForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', []));
          // console.log(mdata);
        }        
    })
    this.typeKeys=[...this.typeMap.keys()];
    console.log("typekey",this.typeKeys);
    
  })
}

  // getAssetType(){
  //   this.assetTypeService.getAll().subscribe(result => {
  //     this.dataType=result;
  //     // console.log(this.dataType);     
  //   })
  // }
  getAssetTypeWithMetadata() {
   this.assestassetService.assignedType.subscribe(res => {
    this.dataType=res;
    console.log("update",this.dataType);
   })
  }
 

}
