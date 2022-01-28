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

@Component({
  selector: 'hrms-employee-asset-changeorswap',
  templateUrl: './employee-asset-changeorswap.component.html',
})
export class EmployeeAssetChangeorswapComponent implements OnInit {
  employeeassetchangeForm: FormGroup;
  @Input() assetId;
  @Input() assetTypeId
  Astvalues: AssetAssets;
  currentTypeMap: Map<any, any>;
  currentTypeKeys: string[];
  newTypeKeys: string[];
  newTypeMap: Map<any, any>;
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
    this.employeeassetchangeForm = this.createFormGroup();
    this.getCurrentAssetById();
    this.getAssetType();
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
      newDescription: ['', [
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
          this.currentTypeMap.set(mdata.metadata, mdata);
          (this.employeeassetchangeForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
        this.currentTypeKeys = [...this.currentTypeMap.keys()];
        let mdatavalue = {};
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
      console.log(this.dataType);     
    })
  }
  
  getUnallocatedAssets(ev){
    console.log(ev.target.value, this.employeeassetchangeForm.controls.newAssetType.value);
    const evevalue =  this.employeeassetchangeForm.controls.newAssetType.value;
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

  checkAssetName(ev){
    if (!this.employeeassetchangeForm.controls['newAssetName'].value) {
      this.employeeassetchangeForm.controls['newAssetName'].reset()
    }
    this.newTypeId=this.employeeassetchangeForm.controls.newAssetName.value.typeId;
    this.newAssetId=this.employeeassetchangeForm.controls.newAssetName.value.assetId;
    console.log("values>>",this.newTypeId,this.newAssetId);
     forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.newTypeId),
      this.assestassetService.getAssetById(this.newAssetId)
    ])
      .subscribe(([newMetadatas, newAsset]) => {
        newMetadatas.forEach(mdata => {
          this.newTypeMap.set(mdata.metadata, mdata);
          (this.employeeassetchangeForm.get('newMetadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
        this.newTypeKeys = [...this.newTypeMap.keys()];
        let newMdatavalue = {}
        this.newTypeKeys.map(key => {
          newMdatavalue[key] = newAsset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.newTypeMap.get(key).id)?.value || ''
        });
        this.employeeassetchangeForm.patchValue({
          ...newAsset,
          newMetadatas: newMdatavalue,
        });
        this.Astvalues = newAsset;
      })
  }



  formatter = (assetList) => assetList.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.assetList.filter((assetList:any) => new RegExp(term, 'mi').test(assetList.name)).slice(0, 10))
  )

  getMetadata(){
 
    
   
  }



  

}
