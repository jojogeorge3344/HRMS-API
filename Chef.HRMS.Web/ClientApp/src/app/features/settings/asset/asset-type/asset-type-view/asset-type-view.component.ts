import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from './../asset-type.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetMetadataService } from '../../asset-metadata/asset-metadata.service';

@Component({
  selector: 'hrms-asset-type-view',
  templateUrl: './asset-type-view.component.html',
  styleUrls: ['./asset-type-view.component.scss']
})
export class AssetTypeViewComponent implements OnInit {

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
  
  this.currentUserId = getCurrentUserId();
  this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.assetTypeId);
    console.log(this.assetTypeId);
    
    
  }

  get name() { return this.editForm.get('assettypename'); }




  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      assettypename: ['', [
        Validators.required,
        Validators.maxLength(30),
        //Validators.pattern('^([a-zA-Z0-9 ])+$'),
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




