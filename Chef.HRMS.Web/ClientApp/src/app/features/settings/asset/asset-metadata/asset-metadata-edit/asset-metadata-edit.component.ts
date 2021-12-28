import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetTypeService } from '../../asset-type/asset-type.service';
import { AssetMetadataService } from '../asset-metadata.service';
import { AssetAssetsService } from '../../asset-assets/asset-assets.service';
import { AssetTypeMetadata } from '../asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { values } from 'lodash';
import { MetadataDataType } from 'src/app/models/common/types/metadatadatatype';
import { AssetAssets } from '../../asset-assets/asset-assets.model';


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
  metadataId: any;
  assetTypeName;
  metas: any;
  newMetadata: any;
  emptyValidation = false;
  duplicateValidation = false;
  assignedMetadata: AssetAssets[];
  assignedMetadataId: number[] = [];
  dataTypes: string[];
  maxAlert = false;

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
    this.metadataFiltered = this.metaData.filter(this.getMetadataFiltered);
    this.patchDataArray();
    this.getAllAssignedMetadata();
  }

  getMetadataFiltered(data) {
    let id = JSON.parse(localStorage.getItem('assetTpId'));
    if (data.assettypeId === id) {
      return true;
    }
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
    console.log(this.metadataFiltered);
    this.assetAssetService.getAll().subscribe(res => {
      console.log("helloo");
      
      console.log(res);
      
      this.assignedMetadata = res.filter(type => (type.AssetTypeId === this.assetTpId));
      console.log(this.assignedMetadata);
      this.assignedMetadataId = this.assignedMetadata.map(val => val.AssetTypeMetadataId);///
      console.log(this.assignedMetadataId);
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(i) {
    let id = this.metadataFiltered[i].id;
    console.log(id);
    return this.assignedMetadataId.includes(id);
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
      dataRows: this.formBuilder.array([])
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
    let metaArray = this.mdata.value;
    let name = metaArray[i].metadata;
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete metadata "${name}"?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.metaData.forEach(val => {
          if (val.metadata === name && val.assettypeId === this.assetTpId) { this.metadataId = val.id }
        })
        let l = this.mdata.length;
        if (l > 1) {
          if (this.metadataId) {
            this.mdata.removeAt(i);
            this.assetMetadataService.deleteMetadata(this.metadataId).subscribe(result => {
              this.toastr.showSuccessMessage('Asset metadata deleted successfully!');
            },
              error => {
                console.error(error);
                this.toastr.showErrorMessage('Unable to delete the asset metadata');
              });
          }
          else { this.mdata.removeAt(i); }
        }
        else {
          if (this.metadataId) {
            this.mdata.removeAt(i);
            this.assetMetadataService.deleteMetadata(this.metadataId).subscribe(result => {
              this.toastr.showSuccessMessage('Asset metadata deleted successfully!');
              //this.activeModal.close('submit');
            },
              error => {
                console.error(error);
                this.toastr.showErrorMessage('Unable to delete the asset metadata');
              });
            this.mdata.push(this.createMetadata());
          }
          else { this.editForm.get('dataRows').reset(); }
        }
      }
    });
  }
}
