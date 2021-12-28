import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-asset-assets-edit',
  templateUrl: './asset-assets-edit.component.html'
})
export class AssetAssetsEditComponent implements OnInit {
  
  editForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){ 
    // console.log(this.assetForm.value)
    this.assestassetService.add(this.assetEditForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset already exists!');
      } else {
        this.toastr.showSuccessMessage('asset added successfully!');
        this.activeModal.close('submit');
