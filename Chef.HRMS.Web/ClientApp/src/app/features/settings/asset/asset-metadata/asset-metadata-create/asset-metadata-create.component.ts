import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetTypeService } from '../../asset-type/asset-type.service';
import { AssetMetadataService } from '../asset-metadata.service';
import { AssetTypeMetadata } from '../asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { values } from 'lodash';
import { MetadataDataType } from 'src/app/models/common/types/metadatadatatype';

@Component({
  selector: 'hrms-asset-metadata-create',
  templateUrl: './asset-metadata-create.component.html'
})
export class AssetMetadataCreateComponent implements OnInit {
  addForm: FormGroup;
  mdata: FormArray;
  assetTypes: AssetType[];
  //metadata: AssetTypeMetadata[];
  metadataDatatypeKeys:number[];
  metadataDatatype=MetadataDataType;
  assetTypeId;
  assetTypeName;
  metas: any;
  newMetadata: any;
  visibleMinus = false;
  emptyValidation = false;
  duplicateValidation = false;
  dataTypes: string[];
  currentUserId: number;
  maxAlert=false;


  constructor(private assetTypeService: AssetTypeService,
    private assetMetadataService: AssetMetadataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.metadataDatatypeKeys = Object.keys(this.metadataDatatype).filter(Number).map(Number);
    //console.log(this.addForm.get('dataRows').value);
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetTypes = result;
      //console.log(this.assetTypes);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the AssetType');
      });
  }

  getAssetTypeId() {
    this.assetTypeName = this.addForm.get('assetType').value;
    this.assetTypes.forEach(val => {
      if (val.assettypename === this.assetTypeName) { this.assetTypeId = val.id }
    })
    // console.log(this.assetTypeId);
  }

  onSubmit() {
    const metdata = (this.addForm.get('dataRows') as FormArray).value?.map(val => ({
      ...val, assettypeId: this.assetTypeId
    }));
    //  console.log(metdata);

    // console.log(metdata.length);
    this.assetMetadataService.add(metdata).subscribe(result => {
      this.toastr.showSuccessMessage('Asset metadata added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the asset metadata');
      });

  }



  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assetType: ['', [
        Validators.required
      ]],
      dataRows: this.formBuilder.array([this.createMetadata()])
    });
  }

  createMetadata() {
    return this.formBuilder.group({
      metadata: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        //duplicateNameValidator(this.assetTypeNames)
      ]],
      assetDataType: [null, Validators.required],
      isMandatory: [false]
    });
  }



  createDataArray(): void {
    this.mdata = this.addForm.get('dataRows') as FormArray;
    this.metas = this.mdata.value;
    let l = this.metas.length;
    // console.log(l);
    if (l < 5) {
      this.maxAlert=false;
      this.newMetadata = this.addForm.get('dataRows').value[l - 1].metadata;
      // console.log(this.newMetadata);
      // console.log(this.metas);      
      if (this.newMetadata == "") {
        this.emptyValidation = true;
      }
      else {
        this.emptyValidation = false;
        if (l > 1) {
          var found = -1;
          for (let i = 0; i < l - 1; i++) {
            if (this.metas[i].metadata == this.newMetadata) {
              found = i;
              break;
            }
          }
          if (found !== -1) {
            //console.log("Metadata already entered");
            this.duplicateValidation = true;
          }
          else {
            this.duplicateValidation = false;
            this.mdata.push(this.createMetadata());
          }
        }
        else {
          this.mdata.push(this.createMetadata());
        }
      }
    }
    else {
      //console.log("You have entered maximum number of metadata!!");
      this.maxAlert=true;
    }
  }

  removeMetadata(i) {
    this.emptyValidation = false;
    this.duplicateValidation = false;
    this.maxAlert=false;
    this.mdata = this.addForm.get('dataRows') as FormArray;
    // console.log(this.mdata);
    let l = this.mdata.length;
    // console.log(l);
    if (l > 1) {
      this.mdata.removeAt(i);
      // console.log(this.mdata);
    }
    else {
      this.addForm.get('dataRows').reset();
      /// console.log(this.mdata);
    }
  }

}



