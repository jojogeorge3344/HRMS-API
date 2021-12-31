import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { assetmetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetAssets } from '../asset-assets.model';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-edit',
  templateUrl: './asset-assets-edit.component.html'
})
export class AssetAssetsEditComponent implements OnInit {
  
  assetEditForm: FormGroup;
  assetType: AssetType;
  assetValues:any[]

  currentUserId: number;
  dataType: any[];
  @Input() assetmetadata: assetmetadata
  @Input() assetTypeNames: AssetType;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  typeMap: Map<any, any>;
  typeKeys: string[];
  @Input() assetId;
  @Input() mvalue;
  route: any;
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
    this.assetEditForm = this.createFormGroup();
    this.getallAssetById();
    debugger;
 
  }
  get metadataFormGroup () {
    return<FormGroup>this.assetEditForm.get('metadatas') 
  }

  onSubmit(){
       let mdatavalues= {...this.assetEditForm.value,
       assetMetadataValues:this.typeKeys.map(key => {
         return{
          assettypeId:this.assetEditForm.value.assetTypeId,
          assettypeMetadataId:this.assetEditForm.value.assetTypeMetadataId,
          value:this.assetEditForm.value.metadatas[key]
        }
    })};
    
    this.assestassetService.update(mdatavalues).subscribe((result: any) => {
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
        date: ['',[
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

    getallAssetById(){
      this.assestassetService.getAssetById(this.assetId).subscribe(result => {
        this.assetEditForm.patchValue(result);
        console.log(result);
      }) 
  }
  


  

  


  }
