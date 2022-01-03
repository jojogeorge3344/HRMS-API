import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { assetmetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { forkJoin } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetAssets } from '../asset-assets.model';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-edit',
  templateUrl: './asset-assets-edit.component.html'
})
export class AssetAssetsEditComponent implements OnInit {
  @Input() assetTypeName
  @Input() assetId;
  @Input() assetTypeId;
  assetEditForm: FormGroup;
  assetType: AssetType;
  currentUserId: number;
  dataType: any[];
  // @Input() assetmetadata: assetmetadata
  // @Input() assetTypeNames: AssetType;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  typeMap: Map<any, any>;
  typeKeys: string[];
  route: any;
  Astvalues: AssetAssets;


  constructor(
    private datepipe: DatePipe,
    private assestassetService: AssetAssetsService,
    private assetMetadataService: AssetMetadataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
   
    this.typeMap= new Map();
    this.currentUserId = getCurrentUserId();
    // console.log(this.assetTypeId.assetTypeId);
    
    this.assetEditForm = this.createFormGroup();
    this.getallAssetById();
    // this.getvalues();
  
 
  }
  get metadataFormGroup () {
    return<FormGroup>this.assetEditForm.get('metadatas') 
  }

  onSubmit(){
    console.log(this.assetEditForm.value);
    //console.log(this.typeKeys);
       let mdatavalues= {...this.assetEditForm.getRawValue(), 
        date:new Date(this.assetEditForm.getRawValue().date.split('-')[2],this.assetEditForm.getRawValue().date.split('-')[1]-1, this.assetEditForm.getRawValue().date.split('-')[0]),
       assetMetadataValues:this.typeKeys.map(key => {
        //  console.log(this.typeMap.get(key));
         
         return{
          id:this.findId(this.typeMap.get(key).id),
          assetId:this.assetEditForm.value.id,
          assettypeId:this.assetEditForm.value.assetTypeId,
          assettypeMetadataId:this.typeMap.get(key).id,
          value:this.assetEditForm.value.metadatas[key]
        }
    })};

    this.assestassetService.update(mdatavalues).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset already exists!');
      } else {
        this.toastr.showSuccessMessage('asset edited successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to edit the asset');
    });

    }
    findId(id: any): any {
    return this.Astvalues.assetMetadataValues.find(mdata => mdata.assettypeMetadataId===id)?.id;
  }

    createFormGroup(): FormGroup {
      return this.formBuilder.group({
        valueId: [{value:'', disabled:true},[
          Validators.required,
        ]],
        id: ['',[]],
        date: [{value:'', disabled:true},[
          Validators.required,
        ]],
        assetTypeId: ['', [
          Validators.required,
        ]],
        assetTypeMetadataId: ['', [
          Validators.required,
        ]],
        assetMetadataValues: ['', []],
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

  //   getvalues(){
  //     // Object.keys(this.metadataFormGroup.controls).forEach(key => { this.metadataFormGroup.removeControl(key)});
  //     // this.typeMap.clear();
  //     // this.typeKeys=[];
  //     this.assetMetadataService.getAssetMetadataById(this.assetTypeId.assetTypeId).subscribe(res => {
  //       res.forEach(mdata => {
  //         // this.assetForm.patchValue({assetMetadataId:mdata.id});
  //         this.assetEditForm.get('assetTypeMetadataId').patchValue(mdata.id);
          
  //         this.typeMap.set(mdata.metadata,mdata.assetDatatype);

  //             (this.assetEditForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));
              
  //             // console.log(mdata);  
         
  //     })
  //     this.typeKeys=[...this.typeMap.keys()];
  //   })
  // }

    getallAssetById(){
      forkJoin([
        this.assetMetadataService.getAssetMetadataById(this.assetTypeId.assetTypeId),  
        this.assestassetService.getAssetById(this.assetId)
      ])
      .subscribe(([metadatas,asset]) => {
        metadatas.forEach(mdata => {
          // this.assetForm.patchValue({assetMetadataId:mdata.id});
         //this.assetEditForm.get('assetTypeMetadataId').patchValue(mdata.id);
          
          this.typeMap.set(mdata.metadata,mdata);

              (this.assetEditForm.get('metadatas')as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));
              
              // console.log(mdata);  
         
      })
      this.typeKeys=[...this.typeMap.keys()];
      let mdatavalue = {}
      this.typeKeys.map(key => {
        
        mdatavalue[key] = asset.assetMetadataValues.find(mvalue =>mvalue.assettypeMetadataId === this.typeMap.get(key).id)?.value || ''
        
      });
    //  console.log(mdatavalue, asset.assetMetadataValues,this.typeMap);
     
      this.assetEditForm.patchValue({
        ...asset,
        metadatas:mdatavalue,
        date: this.datepipe.transform(asset.date, "dd-MM-yyyy")
        });
      this.Astvalues= asset;
    })
   
  }

  
  


  

  


  }
