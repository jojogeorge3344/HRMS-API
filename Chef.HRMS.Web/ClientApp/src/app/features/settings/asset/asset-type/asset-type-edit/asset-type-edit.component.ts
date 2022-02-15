import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from './../asset-type.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetMetadataService } from '../../asset-metadata/asset-metadata.service';

@Component({
  selector: 'hrms-asset-type-edit',
  templateUrl: './asset-type-edit.component.html'
})
export class AssetTypeEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  @Input() assetTypeId: any;
  @Input() assetTypeNames: string[];
  assignedAssetType : any = [];
  isDisabled : boolean = false

  constructor(
    private assetTypeService: AssetTypeService,
    private assetMetadataService: AssetMetadataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
  this.getAssignedAssetType();
  this.currentUserId = getCurrentUserId();
  this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.assetTypeId);
    console.log(this.assetTypeId);
    
    
  }

  get name() { return this.editForm.get('assettypename'); }

  getAssignedAssetType() {
    this.assetMetadataService.getAllMetadata().subscribe(res => {
    this.assignedAssetType = res.map(type =>(type.assettypeId));
    // return this.assignedAssetType.includes(this.assetTypeId.id);
    this.assignedAssetType.includes(this.assetTypeId.id)? //if condition
    this.editForm.controls['assettypename'].disable() : this.editForm.controls['assettypename'].enable() 
    
    },
    error => {
      console.error(error);
    });
  }

  

  onSubmit() {
    console.log(this.editForm.value)
    this.assetTypeService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Asset type already exists!');
      } else {
        this.toastr.showSuccessMessage('The Asset type is updated successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('There is an error in updating Asset Type');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
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
      createdDate: []
    });
  }
}
