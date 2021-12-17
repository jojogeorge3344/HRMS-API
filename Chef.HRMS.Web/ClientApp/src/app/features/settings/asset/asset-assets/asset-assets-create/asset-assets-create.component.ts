import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  assetId: any;
  assetForm: FormGroup;
  selectedValue: string = '';
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
    return<FormGroup>this.assetForm.get('metaData') 
  }
  onSubmit(){
    // console.log(this.assetForm.value)
    this.assestassetService.add(this.assetForm.value).subscribe((result: any) => {
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
      Date: [new Date(), [
        Validators.required,
      ]],
      assetTypeId: ['', [
        Validators.required,
      ]],
      assetMetadataId: ['', [
        Validators.required,
      ]],
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
      // selectedValue: ['', [
      //   Validators.required,
      // ]],
      metaData: this.formBuilder.group({}),
    });
  }
  onSubmit(){
    this.assetassetService.add(this.assetForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset  already exists!');
      } else {
        this.toastr.showSuccessMessage('asset  added successfully!');
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
    console.log(ev)
    // this.selectedValue=  
    // console.log(this.selectedValue);
    this.assetMetadataService.getAssetMetadataById(this.assetForm.get('assetTypeId').value).subscribe(res => {
      this.metaData=res;
      res.forEach(mdata => {
        // this.assetForm.patchValue({assetMetadataId:mdata.id});
        this.assetForm.get('assetMetadataId').patchValue(mdata.id);
        this.typeMap.set(mdata.metadata,mdata.assetDatatype)
        console.log(this.typeMap);
        // console.log(this.typeKeys);
        if(mdata.ismandatory){
          (this.assetForm.get('metaData')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));
        }
        else{
          (this.assetForm.get('metaData')as FormGroup).addControl(mdata['metadata'], new FormControl('', []));
        }
        
      // console.log(this.assetForm);   
    })
    this.typeKeys=[...this.typeMap.keys()];
  })
}
  // createFormControl(mdata: AssetTypeMetadata) {
  //  return this.formBuilder.control('')
  // }

  

  getAssetType(){
    this.assetTypeService.getAll().subscribe(result => {
      this.dataType=result;
      console.log(this.dataType);     
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
