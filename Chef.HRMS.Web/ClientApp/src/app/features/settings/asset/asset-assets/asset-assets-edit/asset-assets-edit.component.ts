import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AssetAssetsService } from '../asset-assets.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';




@Component({
  selector: 'hrms-asset-assets-edit',
  templateUrl: './asset-assets-edit.component.html'
})
export class AssetAssetsEditComponent implements OnInit {
  assetEditForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private assestassetService: AssetAssetsService,
              private toastr: ToasterDisplayService) { }

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
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the asset');
    });

}
}
