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
  selector: 'hrms-asset-metadata-edit',
  templateUrl: './asset-metadata-edit.component.html'
})
export class AssetMetadataEditComponent implements OnInit {
  editForm: FormGroup;
  mdata: FormArray;
  assetTypes: AssetType[];
  metadataFiltered: AssetTypeMetadata[];
  metadataDatatypeKeys: number[];
  metadataDatatype = MetadataDataType;
  isDisabled = true;
  metadataId: any;
  assetTypeName;
  metas: any;
  newMetadata: any;
  emptyValidation = false;
  duplicateValidation = false;
  dataTypes: string[];
  maxAlert = false;
  
  @Input() assetTpId: number;
  @Input() assetTpName: string;
  @Input() metaData: AssetTypeMetadata[];

  constructor(private assetTypeService: AssetTypeService,
    private assetMetadataService: AssetMetadataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.metadataDatatypeKeys = Object.keys(this.metadataDatatype).filter(Number).map(Number);
    localStorage.setItem('assetTpId', JSON.stringify(this.assetTpId));
    this.metadataFiltered = this.metaData.filter(this.getMetadataFiltered);
    this.patchDataArray();
  }

  getMetadataFiltered(data) {
    let id = JSON.parse(localStorage.getItem('assetTpId'));
    if (data.assettypeId === id) {
      return true;
    }
  }

  patchDataArray() {
    let control = this.editForm.get('dataRows') as FormArray;
    console.log(control);
    console.log(this.metadataFiltered);


    this.metadataFiltered.forEach(data => {
      control.push(this.formBuilder.group({
        metadata: data.metadata,
        assetDataType: data.assetDataType,
        isMandatory: data.isMandatory
      }));
    });
  }

  onSubmit() {
    const metdata = (this.editForm.get('dataRows') as FormArray).value.map(val => ({
      ...val, assettypeId: this.assetTpId
    }));
    this.assetMetadataService.update(metdata).subscribe(result => {
      this.toastr.showSuccessMessage('Asset metadata updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the asset metadata');
      });
  }



  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assetType: [this.assetTpName, [
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
    this.mdata = this.editForm.get('dataRows') as FormArray;
    this.metas = this.mdata.value;
    let l = this.metas.length;
    if (l < 6) {
      this.maxAlert = false;
      this.newMetadata = this.editForm.get('dataRows').value[l - 1].metadata;
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
            //console.log("Metadata already entered above");
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
      this.maxAlert = true;
    }
  }

  removeMetadata(i) {
    this.emptyValidation = false;
    this.duplicateValidation = false;
    this.maxAlert = false;
    this.mdata = this.editForm.get('dataRows') as FormArray;
    let metaname = this.mdata.value;
    let name = metaname[i + 1].metadata;
    this.metaData.forEach(val => {
      if (val.metadata === name && val.assettypeId === this.assetTpId) { this.metadataId = val.id }
    })
    let l = this.mdata.length;
    if (l > 1) {
      this.mdata.removeAt(i);
      this.assetMetadataService.delete(this.metadataId).subscribe(result => {
        this.toastr.showSuccessMessage('Asset metadata deleted successfully!');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to delete the asset metadata');
        });
    }
    else {
      this.editForm.get('dataRows').reset();
      this.assetMetadataService.delete(this.metadataId).subscribe(result => {
        this.toastr.showSuccessMessage('Asset metadata deleted successfully!');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to delete the asset metadata');
        });
       }
    }

  }
