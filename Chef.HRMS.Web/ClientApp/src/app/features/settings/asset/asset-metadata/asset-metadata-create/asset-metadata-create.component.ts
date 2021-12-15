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

@Component({
  selector: 'hrms-asset-metadata-create',
  templateUrl: './asset-metadata-create.component.html'
})
export class AssetMetadataCreateComponent implements OnInit {
  addForm: FormGroup;
  mdata: FormArray;
  assetTypes: AssetType;
  metadata: AssetTypeMetadata[];
  // delButton=false;
  assetTypeId;
  metas: any;
  newMetadata: any;

  currentUserId: number;
  @Input() assetTypeNames: string[];


  constructor(private assetTypeService: AssetTypeService,
    private assetMetadataService: AssetMetadataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.assetMetadataService.getAllAssetType().subscribe(result => {
      this.assetTypes = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the AssetType');
      });
  }

  onSubmit() {
    this.mdata = this.addForm.get('dataRows') as FormArray;
    this.assetMetadataService.insertMetadata(this.assetTypeId, this.mdata).subscribe(result => {

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
      metadata: [],
      datatype: [],
      isMandatory: []
    });

  }

  createDataArray(i): void {
    this.newMetadata = this.addForm.get('dataRows').value[i].metadata;
    console.log(this.newMetadata);
    this.mdata = this.addForm.get('dataRows') as FormArray;
    this.metas = this.mdata.value;
    let l = this.metas.length;
    console.log(this.metas);
    console.log(l);

    if (l > 1) {
      var found = -1;
      for (let i = 0; i < l-1; i++) {
        if (this.metas[i].metadata == this.newMetadata) {
          found = i;
          break;
        }

      }
      if (found !== -1) {
        console.log("Metadata already entered.");
      }
      else {
        this.mdata.push(this.createMetadata());
      }
    }
    else {
      this.mdata.push(this.createMetadata());
    }
  }



  // addMetadata(){
  //   this.assetMetadataService.insertMetadata(this.assetTypeId,this.mdata).subscribe(result => {
  // if (result.id === -1) {
  //   this.toastr.showErrorMessage('asset type already exists!');
  // } else {
  //     this.toastr.showSuccessMessage('Asset metadata added successfully!');
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.showErrorMessage('Unable to fetch the AssetTypeId');
  //     });
  // }


}



