import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AssetAssets } from '@settings/asset/asset-assets/asset-assets.model';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { forkJoin, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeAssetService } from '../employe-asset.service';
import { DatePipe, formatDate } from '@angular/common';
import * as _ from 'lodash';


@Component({
  selector: 'hrms-employee-asset-changeorswap',
  templateUrl: './employee-asset-changeorswap.component.html',
})
export class EmployeeAssetChangeorswapComponent implements OnInit {
  employeeassetchangeForm: FormGroup;
  @Input() assetId
  @Input() assetTypeId
  @Input() assetRaiseRequestId
  @Input() empid
  @Input() assetTypeName
  Astvalues: AssetAssets;
  currentTypeMap: Map<any, any>;
  currentTypeKeys: string[];
  newTypeKeys: string[];
  newTypeMap: Map<any, any>;
  newMdataTypeKeys: string[];
  newMdataTypeMap: Map<any, any>;
  assetList =[];
  dataType: any[];
  newAsssetTypeId: any;
  unallocatedAssets:any;
  newTypeId:number;
  newAssetId:number;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private assestassetService: AssetAssetsService,
    private assetMetadataService: AssetMetadataService,
    private employeAssetService: EmployeAssetService,
    private assetTypeService: AssetTypeService,
  ) { }

  ngOnInit(): void {
    this.currentTypeMap = new Map();
    this.newTypeMap = new Map();
    this.newMdataTypeMap=new Map();
    this.employeeassetchangeForm = this.createFormGroup();
    this.getCurrentAssetById();
    this.getAssetType();
  }
  onSubmit() {
    console.log(this.employeeassetchangeForm.getRawValue());
    let allValues= {...this.employeeassetchangeForm.getRawValue(),
        // status:1,
        assetMetadataValueId:this.newMdataTypeKeys.map(key => {
        return{
          assettypeMetadataId:this.newMdataTypeMap.get(key)
        }
      })};
      let changeValues={
        assetTypeId:allValues.newAssetType,
        assetId:allValues.newAssetName.assetId,
        assetRaiseRequestId:this.assetRaiseRequestId,
        assetMetadataValueId:allValues.assetMetadataValueId[0].assettypeMetadataId,
        empId:this.empid,
        assetName:allValues.newAssetName.name,
        allocatedDate:new Date(),
        status:4,
        description:allValues.newDescription,
        assetTypeName:_.find(this.dataType,['id',allValues.newAssetType]).assettypename,
        
      };

          this.newMdataTypeKeys.map((key,i) => {  
            if(i){
              changeValues['metadataValueId'+(i+1)]=this.newMdataTypeMap.get(key);
            }
              
      })
      this.newMdataTypeMap.size;
      for (let index = this.newMdataTypeMap.size+1 ; index <6 ; index++) {
        changeValues['metadataValueId'+index] = 0;
        
      }
      console.log("new >>",this.employeeassetchangeForm.value.newAssetMetadataid,);
      console.log("allvalues>>",allValues);
  
    //this.employeAssetService.add(changeValues).subscribe((result) => {
    //this.employeAssetService.updateAllocateStatus(changeValues.assetId,changeValues.assetTypeId,changeValues.status)
     
      forkJoin([
        this.employeAssetService.insertAllocate([changeValues]),
        this.employeAssetService.updateStatus(this.Astvalues.id,this.Astvalues.status)
      ]).subscribe(([result, asset]) => {
        console.log(asset);
        console.log(this.Astvalues.id,this.Astvalues.status);
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset already swaped!');
      } else {
        this.toastr.showSuccessMessage('changed successfully successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to change the asset');
    });

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
      newDescription: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      
    });
  }


  getCurrentAssetById() {
    forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.assetTypeId),
      this.assestassetService.getAssetById(this.assetId)
    ])
      .subscribe(([metadatas, asset]) => {
        console.log("asset",asset);
        
        metadatas.forEach(mdata => {
          this.currentTypeMap.set(mdata.metadata, mdata);
          (this.employeeassetchangeForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
        this.currentTypeKeys = [...this.currentTypeMap.keys()];
        let mdatavalue = {};
        console.log("typeks",this.currentTypeKeys);
        
        this.currentTypeKeys.map(key => {
          mdatavalue[key] = asset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.currentTypeMap.get(key).id)?.value || ''
        });
        this.employeeassetchangeForm.patchValue({
          ...asset,
          metadatas: mdatavalue,
        });
        this.Astvalues = asset;
        
      })
  }

  getAssetType(){
    this.assetTypeService.getAll().subscribe(result => {
      this.dataType=result;
      console.log("assettype",this.dataType);    
    })
  }
  
  getUnallocatedAssets(ev){
    console.log(ev);
    
    console.log(ev.target.value, this.employeeassetchangeForm.controls.newAssetType.value);
    const evevalue =  this.employeeassetchangeForm.controls.newAssetType.value;
    console.log(evevalue);
    
    this.employeAssetService.getUnallocatedAssets(evevalue).subscribe(res => {
      this.unallocatedAssets=res;
      console.log("unallocated",this.unallocatedAssets);
      
      this.unallocatedAssets.forEach(item=>{
      // console.log(item.valueId,this.employeeassetchangeForm.controls.valueId.value);
      if(item.valueId !== this.employeeassetchangeForm.controls.valueId.value){
          // console.log("item> ", item)
          this.assetList.push({item:item.valueId,name:item.assetName,typeId:item.assetTypeId,assetId:item.id});
         }
      })

      console.log(this.assetList);
      // this.assetList = res.filter(asset => (asset.valueId !== this.employeeassetchangeForm.value('valueId')));      
      
    })
  }

  getNewMetadata(ev){
    if (!this.employeeassetchangeForm.controls['newAssetName'].value) {
      this.employeeassetchangeForm.controls['newAssetName'].reset()
    }
    else{
      this.newTypeId=this.employeeassetchangeForm.controls.newAssetName.value.typeId;
      this.newAssetId=this.employeeassetchangeForm.controls.newAssetName.value.assetId;
      console.log("values>>",this.newTypeId,this.newAssetId);
       forkJoin([
        this.assetMetadataService.getAssetMetadataById(this.newTypeId),
        this.assestassetService.getAssetById(this.newAssetId)
      ])
        .subscribe(([newMetadatas, newAsset]) => {
          console.log("neewAssets",newAsset,"mda", newMetadatas);
          
          newAsset.assetMetadataValues.forEach(mdataId => {
            // console.log(">>>>>>>>",mdataId);
            this.newMdataTypeMap.set(mdataId.value,mdataId.id,);
          })
          console.log("newwww",this.newMdataTypeMap);
          
          this.newMdataTypeKeys = [...this.newMdataTypeMap.keys()];
          console.log("mkkkkkkkkk",this.newMdataTypeMap);
          


          newMetadatas.forEach(mdata => {
            this.newTypeMap.set(mdata.metadata, mdata);
            (this.employeeassetchangeForm.get('newMetadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
          this.newTypeKeys = [...this.newTypeMap.keys()];
          let newMdatavalue = {}
          this.newTypeKeys.map(key => {
            newMdatavalue[key] = newAsset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.newTypeMap.get(key).id)?.value || ''
          });

          
          this.employeeassetchangeForm.patchValue({
            newMetadatas: newMdatavalue,
          });
        })
    }
   
  }



  formatter = (assetList) => assetList.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.assetList.filter((assetList:any) => new RegExp(term, 'mi').test(assetList.name)).slice(0, 10))
  )

  

}
