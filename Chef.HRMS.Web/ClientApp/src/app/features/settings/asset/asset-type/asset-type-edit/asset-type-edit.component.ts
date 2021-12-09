import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from './../asset-type.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-asset-type-edit',
  templateUrl: './asset-type-edit.component.html'
})
export class AssetTypeEditComponent implements OnInit {

  editForm: FormGroup;

  currentUserId: number;
  @Input() assetTypeId: any;
  @Input() assetTypeNames: string[];

  constructor(
    private assetTypeService: AssetTypeService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
  this.currentUserId = getCurrentUserId();
  this.editForm = this.createFormGroup();
  this.assetTypeService.get(this.assetTypeId).subscribe(result => {
    this.editForm.patchValue(result);
  },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the asset Type');
    });
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.assetTypeService.update(this.editForm.value).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Asset type already exists!');
      } else {
        this.toastr.showSuccessMessage('The Asset type is updated successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('There is an error in updating asset type');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.assetTypeNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      createdDate: []
    });
  }
}
