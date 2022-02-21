import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrms-employee-asset-changereturnview',
  templateUrl: './employee-asset-changereturnview.component.html',
})
export class EmployeeAssetChangereturnviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // getCurrentAssetById() {
  //   forkJoin([
  //     this.assetMetadataService.getAssetMetadataById(this.assetTypeId),
  //     this.assestassetService.getAssetById(this.assetId)
  //   ])
  //     .subscribe(([metadatas, asset]) => {
  //       console.log("asset",asset);
        
  //       metadatas.forEach(mdata => {
  //         this.currentTypeMap.set(mdata.metadata, mdata);
  //         (this.employeeassetchangeForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
  //       this.currentTypeKeys = [...this.currentTypeMap.keys()];
  //       let mdatavalue = {};
  //       console.log("typeks",this.currentTypeKeys);
        
  //       this.currentTypeKeys.map(key => {
  //         mdatavalue[key] = asset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.currentTypeMap.get(key).id)?.value || ''
  //       });
  //       this.employeeassetchangeForm.patchValue({
  //         ...asset,
  //         metadatas: mdatavalue,
  //       });
  //       this.Astvalues = asset;
        
  //     })
  // }

}
