import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetAssets } from '@settings/asset/asset-assets/asset-assets.model';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { forkJoin } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetChangeType } from 'src/app/models/common/types/assetchangetype';
import { AssetReturnType } from 'src/app/models/common/types/assetreturntype';
import { RequestType } from 'src/app/models/common/types/requesttype';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-changereturnview',
  templateUrl: './employee-asset-changereturnview.component.html',
})
export class EmployeeAssetChangereturnviewComponent implements OnInit {
//  @Input() requestType
  @Input() assetTypeId
  @Input() status
  @Input() assetRaiseRequestId
  @Input() empid
  @Input() assetTypeName
  comments:string;
  reason:string;
  assetChangeType=AssetChangeType;
  assetReturnType=AssetReturnType;
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
               private assetMetadataService: AssetMetadataService,
               private splitByUpperCase: SplitByUpperCasePipe) 
    { }

  ngOnInit(): void {
    this.typeMap = new Map();
    this.getAssetId();
    this.employeeassetchangeReturnForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      valueId: [{value:'', disabled:true}, [
        Validators.required,
      ]],
      assetName: [{value:'', disabled:true}, [
        Validators.required,
      ]],
      metadatas: this.formBuilder.group([]),
      reason: [{value:'', disabled:true}, []],
      comments: [{value:'', disabled:true}, []],
    });
  }


  getAssetId(){
    this.employeeAsset.getAssetId(this.assetRaiseRequestId).subscribe((res) => { 
      console.log(res);
      this.assetId=res[0].assetid;
      if(res[0].assetid){
        this.getCurrentAssetById();
        this. getReasonAndDescription();
      }
      console.log("assetid>>>>>>",this.assetId); 
    })
  }

  getReasonAndDescription(){
    this.employeeAsset.getReasonAndDescription(this.assetRaiseRequestId,this.status,this.assetId).subscribe((res) => {
      if(res[0].type==2){
      this.comments=res[0].comments
      this.reason=this.assetChangeType[res[0].reason]
      console.log(this.assetChangeType[res[0].reason]);
      
      this.employeeassetchangeReturnForm.patchValue({ comments:this.comments,reason: this.splitByUpperCase.transform(this.reason)});
      }
      else if(res[0].type==3){
      this.comments=res[0].comments
      this.reason=this.assetReturnType[res[0].reason]
      console.log(this.assetReturnType[res[0].reason]);
      
      this.employeeassetchangeReturnForm.patchValue({ comments: this.comments,reason:this.splitByUpperCase.transform(this.reason)});
      }
      console.log("reason and description",res);
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
