import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetAllocated } from '../asset-allocated.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MyAssetsService } from '../my-assets.service';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetTypeMetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetMetadataValue } from '@settings/asset/asset-assets/assetmetadatavalue.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'hrms-my-assets-view',
  templateUrl: './my-assets-view.component.html'
})
export class MyAssetsViewComponent implements OnInit {
  @Input() myAsset: AssetAllocated;
  @Input() currentUserId;
  myAssetViewForm: FormGroup;
  typeMap: Map<any, any>;
  typeKeys: string[];
  dataType: any[];
  assetMetadataList: AssetTypeMetadata[];
  assetMetadataValues: AssetMetadataValue[];
  constructor(
    private myAssetService: MyAssetsService,
    private datepipe: DatePipe,
    private assetMetadataService: AssetMetadataService,
    private assetAssetsService: AssetAssetsService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    // private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    this.typeMap = new Map();
    this.myAssetViewForm = this.createFormGroup();
    this.getallAssetById();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      allocatedDate: [{ value: '', disabled: true }],
      assetTypeName: [{ value: '', disabled: true }],
      assetName: [{ value: '', disabled: true }],
      assetId: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      metadatas: this.formBuilder.group([])
    });
  }
  getallAssetById() {
    forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.myAsset.assetTypeId),
      this.assetAssetsService.getAssetById(this.myAsset.assetId)
    ]).subscribe(([metadatas, asset]) => {
      metadatas.forEach(mdata => {
        this.typeMap.set(mdata.metadata, mdata);
        (this.myAssetViewForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl(''));
      })
      this.typeKeys = [...this.typeMap.keys()];
      let mdatavalue = {}
      this.typeKeys.map(key => {
        mdatavalue[key] = asset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.typeMap.get(key).id)?.value || ''
      });
      this.myAssetViewForm.patchValue({
        ...this.myAsset,
        metadatas: mdatavalue,
        allocatedDate: this.datepipe.transform(this.myAsset.allocatedDate, "dd-MM-yyyy")
      });
    })
  }
}
