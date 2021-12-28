import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { assetmetadata, } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-create',
  templateUrl: './asset-assets-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AssetAssetsCreateComponent implements OnInit {
  assetId: any;
  assetForm: FormGroup;
  assetType: AssetType;
  currentUserId: number;
  dataType: any[];
  metaData: any[];
  metadataid:number;
  date = Date.now();
  @Input() assetmetadata: assetmetadata
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
    return<FormGroup>this.assetForm.get('metadataValue') 
  }
  onSubmit(){
    // console.log(this.assetForm.value)
    let assetFormValue= this.assetForm.value;
    console.log(assetFormValue);
    debugger;
    
    // var i=0
    // this.typeKeys.forEach(val=>{
    //   i=i+1
    //   var param='metadataValue'
    //   assetFormValue[param]=this.assetForm.get('metaData').get(val).value;
    //   console.log(assetFormValue[param]);
    // })
    
    this.assestassetService.add(assetFormValue).subscribe((result: any) => {
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
      assetId: [''],
      date: [new Date(), [
        Validators.required,
      ]],
      assetTypeId: ['', [
        Validators.required,
      ]],
      assetTypeMetadataId: ['', [
        Validators.required,
      ]],
      // metadataValue: ['', []],
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
      metadataValue: this.formBuilder.group({}),
    });
  }
  

 

 

  // createMetadata() {
  //   return this.formBuilder.group({
  //     metadata: [],
  //   });
   
  // }

  // createDataArray():void{
  //   this.clicked=false;
  //   this.mdata=this.assetForm.get('dataRows') as FormArray;
  //   this.mdata.push(this.createMetadata());
  //   console.log(this.mdata);
    
  // }

  getselectedvalue(ev){
    Object.keys(this.metadataFormGroup.controls).forEach(key => { this.metadataFormGroup.removeControl(key)});
    this.typeMap.clear();
    this.typeKeys=[];
    console.log(this.metadataFormGroup);
    this.assetMetadataService.getAssetMetadataById(this.assetForm.get('assetTypeId').value).subscribe(res => {

      // this.metaData=res;
      // console.log(this.metaData);
      
      res.forEach(mdata => {
        // this.assetForm.patchValue({assetMetadataId:mdata.id});
        this.assetForm.get('assetTypeMetadataId').patchValue(mdata.id);
        console.log(mdata.id);
        
        this.typeMap.set(mdata.metadata,mdata.assetDatatype);

        if(mdata.ismandatory){
            (this.assetForm.get('metadataValue')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));
            console.log(mdata);  
        }
        else{
          (this.assetForm.get('metadataValue')as FormGroup).addControl(mdata['metadata'], new FormControl('', []));
          console.log(mdata);
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

  // getiid(){
  //   this.assetId=this.assestassetService.get().subscribe(res => {
  //     this.assetId=res;
  //   })
  // }

  
  // getAssetMetadataById(){
  //   this.assetMetadataService.getAllMetadata().subscribe(result => {
  //     this.metadatas=result;
  //     console.log(this.metadatas);
      
  //   })
  // }

  

}