import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetTypeService } from '../../asset-type/asset-type.service';
import { AssetMetadataService } from '../asset-metadata.service';
import { AssetTypeMetadata } from '../asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { MetadataDataType } from 'src/app/models/common/types/metadatadatatype';
import { max } from 'lodash';

@Component({
  selector: 'hrms-asset-metadata-create',
  templateUrl: './asset-metadata-create.component.html'
})
export class AssetMetadataCreateComponent implements OnInit {
  addForm: FormGroup;
  mdata: FormArray;
  assetTypes: AssetType[];
  assetTypeArray: AssetType[];
  metadataDatatypeKeys: number[];
  metadataDatatype = MetadataDataType;
  assetTypeWithMetadata: AssetTypeMetadata[];
  assetTypeId;
  assetTypeName;
  metas: any;
  newMetadata: any;
  metadataLength: number;
  visibleMinus = false;
  emptyValidation = false;
  duplicateValidation = false;
  dataTypes: string[];
  currentUserId: number;
  maxAlert = false;
  maxLength = false;
  saveDisable = true;

  constructor(private assetTypeService: AssetTypeService,
    private assetMetadataService: AssetMetadataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.metadataDatatypeKeys = Object.keys(this.metadataDatatype).filter(Number).map(Number);
    this.getAllAssetTypes();
  }
  
  getAllAssetTypes() {
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetTypeArray = result;
      this.getAssetTypeWithMetadata();
    }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the AssetType');
      };
  }

  getAssetTypeWithMetadata() {
    this.assetMetadataService.getAllMetadata().subscribe(res => {
      this.assetTypeWithMetadata = res;
      this.getAssetTypesToList();
    },
      error => {
        console.error(error);
      });
  }

  getAssetTypesToList() {
    this.assetTypes = this.assetTypeArray?.filter(({ id: id1 }) => !this.assetTypeWithMetadata.some(({ assettypeId: id2 }) => id2 === id1));
  }

  getAssetTypeId() {
    this.assetTypeName = this.addForm.get('assetType').value;
    this.assetTypes.forEach(val => {
      if (val.assettypename === this.assetTypeName) { this.assetTypeId = val.id }
    })
  }

  onSubmit() {
    this.fieldValidation();
    if (!this.duplicateValidation) {
      const metdata = (this.addForm.get('dataRows') as FormArray).value?.map(val => ({
        ...val, assettypeId: this.assetTypeId
      }));
      this.assetMetadataService.add(metdata).subscribe(result => {
        this.toastr.showSuccessMessage('Asset metadata added successfully!');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to add the asset metadata');
        });
    }
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
        Validators.pattern('^([a-zA-Z ])+$'),
      ]],
      assetDataType: [null, Validators.required],
      isMandatory: [false]
    });
  }

  createDataArray(): void {
    this.fieldValidation();
    this.mdata = this.addForm.get('dataRows') as FormArray;
    this.metas = this.mdata.value;
    let l = this.metas.length;
    if (l < 5) {
      this.maxAlert = false;
      if (this.newMetadata == "") {
        this.emptyValidation = true;
      }
      else {
        if (!this.duplicateValidation) {
          if (!this.emptyValidation) {
            if (!this.maxLength)
              this.mdata.push(this.createMetadata());
          }
        }
      }
    }
    else if (this.newMetadata == "") {
      this.emptyValidation = true;
      this.duplicateValidation = false;
    }
    else {
      //console.log("You have entered maximum number of metadata!!");
      this.maxAlert = true;
    }
  }

  fieldValidation() {
    this.emptyValidation = false;
    this.duplicateValidation = false;
    this.mdata = this.addForm.get('dataRows') as FormArray;
    this.metas = this.mdata.value;
    let l = this.metas.length;
    this.newMetadata = this.addForm.get('dataRows').value[l - 1].metadata.toLowerCase();
    this.metadataLength = this.newMetadata.length;
    if (this.metadataLength > 32) {
      this.maxLength = true;
    }
    else {
      this.maxLength = false;
      if (l > 1) {
        var found = -1;
        for (let i = 0; i < l - 1; i++) {
          if (this.metas[i].metadata.toLowerCase() == this.newMetadata) {
            found = 1;
            break;
          }
        }
        if (found !== -1) {
          //console.log("Metadata already exists");
          this.saveDisable = true;
          this.duplicateValidation = true;
        }
        else {
          this.saveDisable = false;
          this.duplicateValidation = false;
        }
      }
      else {
        this.saveDisable = false;
      }
    }
  }

  removeMetadata(i) {
    this.saveDisable = false;
    this.emptyValidation = false;
    this.duplicateValidation = false;
    this.maxAlert = false;
    this.mdata = this.addForm.get('dataRows') as FormArray;
    let l = this.mdata.length;
    if (l > 1) {
      this.mdata.removeAt(i);
    }
    else {
      this.addForm.get('dataRows').reset();
    }
  }

}



