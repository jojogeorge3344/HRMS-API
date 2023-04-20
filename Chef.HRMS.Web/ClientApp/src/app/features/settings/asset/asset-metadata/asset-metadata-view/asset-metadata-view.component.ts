import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetTypeService } from '../../asset-type/asset-type.service';
import { AssetMetadataService } from '../asset-metadata.service';
import { AssetAssetsService } from '../../asset-assets/asset-assets.service';
import { AssetTypeMetadata } from '../asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { values } from 'lodash';
import { MetadataDataType } from 'src/app/models/common/types/metadatadatatype';
import { AssetAssets } from '../../asset-assets/asset-assets.model';
import { AssetMetadataValue } from '@settings/asset/asset-assets/assetmetadatavalue.model';

@Component({
  selector: 'hrms-asset-metadata-view',
  templateUrl: './asset-metadata-view.component.html',
  styleUrls: ['./asset-metadata-view.component.scss']
})
export class AssetMetadataViewComponent implements OnInit {

  editForm: FormGroup;
  mdata: FormArray;
  assetTypes: AssetType[];
  metadataFiltered: AssetTypeMetadata[];
  metadataFilteredIds: number[];
  metadataDatatypeKeys: number[];
  metadataDatatype = MetadataDataType;
  metadataId: any;
  assetTypeName;
  metas: any;
  newMetadata: any;
  metadataLength: number;
  emptyValidation = false;
  duplicateValidation = false;
  assignedMetadata: AssetMetadataValue[];
  assignedMetadataId: Number[] = [];
  dataTypes: string[];
  maxAlert = false;
  maxLength = false;
  isDisable = false;
  updateDisable = true;

  @Input() assetTpId: number;
  @Input() assetTpName: string;
  @Input() metaData: AssetTypeMetadata[];

  constructor(private assetTypeService: AssetTypeService,
    private assetMetadataService: AssetMetadataService,
    private assetAssetService: AssetAssetsService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.metadataDatatypeKeys = Object.keys(this.metadataDatatype).filter(Number).map(Number);
    localStorage.setItem('assetTpId', JSON.stringify(this.assetTpId));
    this.metadataFiltered = this.metaData.filter(this.getMetadataFiltered).sort(function (a, b) {
      return (a.id - b.id);
    });
    this.getMetadataFilteredId(this.metadataFiltered);
    this.patchDataArray();
    this.getAllAssignedMetadata();
  }

  getMetadataFiltered(data) {
    let id = JSON.parse(localStorage.getItem('assetTpId'));
    if (data.assettypeId === id) {
      return true;
    }
  }
  getMetadataFilteredId(metadataFiltered) {
    this.metadataFilteredIds = metadataFiltered.map(val => val.id);
  }

  patchDataArray() {
    let control = this.editForm.get('dataRows') as FormArray;
    this.metadataFiltered.forEach(data => {
      control.push(this.formBuilder.group({
        metadata: data.metadata,
        assetDataType: data.assetDataType,
        isMandatory: data.isMandatory
      }));
    });
  }

  //To disable buttons and fields
  getAllAssignedMetadata() {
    this.assetAssetService.getAllMetadataValue().subscribe(res => {
      this.assignedMetadata = res.filter(type => (type.assettypeId === this.assetTpId));
      this.assignedMetadataId = this.assignedMetadata.map(val => val.assettypeMetadataId);
      this.assignedMetadataId = this.assignedMetadataId.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
      });
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(i) {
    let id = this.metadataFiltered[i]?.id;
    return this.assignedMetadataId.includes(id);
  }



  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assetType: [this.assetTpName, [
        Validators.required
      ]],
      dataRows: this.formBuilder.array([])
    });
  }

  createMetadata() {
    return this.formBuilder.group({
      metadata: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$')
      ]],
      assetDataType: [null, Validators.required],
      isMandatory: [false]
    });
  }

  createDataArray(): void {
    this.fieldValidation();
    this.mdata = this.editForm.get('dataRows') as FormArray;
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
      this.maxAlert = true;
    }
  }

  updateEnable() {
    this.updateDisable = false;
  }

  fieldValidation() {
    this.emptyValidation = false;
    this.duplicateValidation = false;
    this.mdata = this.editForm.get('dataRows') as FormArray;
    this.metas = this.mdata.value;
    let l = this.metas.length;
    this.newMetadata = this.editForm.get('dataRows').value[l - 1].metadata.toLowerCase();
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
          this.updateDisable = true;
          this.duplicateValidation = true;
        }
        else {
          this.updateDisable = false;
          this.duplicateValidation = false;
        }
      }
      else {
        this.updateDisable = false;
      }
    }
  }

  removeMetadata(i) {
    this.updateDisable = false;
    this.emptyValidation = false;
    this.duplicateValidation = false;
    this.maxAlert = false;
    this.mdata = this.editForm.get('dataRows') as FormArray;
    let metaArray = this.mdata.value;
    let name = metaArray[i].metadata;
    // this.metadataFiltered.forEach(val => {
    //   if (val.metadata === name) { this.metadataId = val.id }
    // })
    if (this.metadataFiltered[i]?.metadata === name) {
      this.metadataId = this.metadataFiltered[i].id;
    }
    let l = this.mdata.length;
    if (l > 1) {
      if (this.metadataId) {
        const modalRef = this.modalService.open(ConfirmModalComponent,
          { centered: true, backdrop: 'static' });
        modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete metadata "${name}"?`;
        modalRef.result.then((userResponse) => {
          if (userResponse == true) {
            this.mdata.removeAt(i);
            if (this.metadataFilteredIds[i]) {
              this.metadataFilteredIds.splice(i, 1);
            }
            this.assetMetadataService.deleteMetadata(this.metadataId).subscribe(result => {
              this.toastr.showSuccessMessage('Asset metadata deleted successfully!');
            },
              error => {
                console.error(error);
                this.toastr.showErrorMessage('Unable to delete the asset metadata');
              });
          }
        });
      }
      else { this.mdata.removeAt(i); }
    }
    else {
      if (this.metadataId) {
        const modalRef = this.modalService.open(ConfirmModalComponent,
          { centered: true, backdrop: 'static' });
        modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete metadata "${name}"?`;
        modalRef.result.then((userResponse) => {
          if (userResponse == true) {
            this.mdata.removeAt(i);
            this.assetMetadataService.deleteMetadata(this.metadataId).subscribe(result => {
              this.toastr.showSuccessMessage('Asset metadata deleted successfully!');
            },
              error => {
                console.error(error);
                this.toastr.showErrorMessage('Unable to delete the asset metadata');
              });
            this.mdata.push(this.createMetadata());
          }
        });
      }
      else { this.editForm.get('dataRows').reset(); }
    }

  }

}


