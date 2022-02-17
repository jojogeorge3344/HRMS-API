import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetTypeService } from '../asset-type.service';

@Component({
  selector: 'hrms-asset-type-create',
  templateUrl: './asset-type-create.component.html'
})
export class AssetTypeCreateComponent implements OnInit {
  addForm: FormGroup;

    currentUserId: number;
    @Input() assetTypeNames: string[];

    constructor(
      private assetTypeService: AssetTypeService,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private toastr: ToasterDisplayService) {
   }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }
  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.assetTypeService.add(this.addForm.value).subscribe((result: any) => {
      console.log("res",result)
      if (result.id === -1) {
        this.toastr.showErrorMessage('Asset Type already exists!');
      } else {
        this.toastr.showSuccessMessage('Asset Type added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the Asset Type');
    });

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assettypename: ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.assetTypeNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(64)
      ]],
    });
  }

}


