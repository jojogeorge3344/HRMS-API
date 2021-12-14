import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { assetmetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-create',
  templateUrl: './asset-assets-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AssetAssetsCreateComponent implements OnInit {
  assetForm: FormGroup;
  clicked=true;
  mdata:FormArray;
  currentUserId: number;
  selectedValue: string = '';
  dataType: any[]  = [
    {id:1, type:"laptop", datatype:"number"},
    {id:2, type:"mobile phone", datatype:"text"},
    {id:3, type:"bluetooth", datatype:"date"}
  ]
  date = Date.now();
  @Input() assetmetadata: assetmetadata;
  @Input() assetTypeNames: string[];
    minDate;
    maxDate;

  constructor(
    private assetassetService: AssetAssetsService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.assetForm = this.createFormGroup();
  }
  onSubmit(){
    this.assetassetService.add(this.assetForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('asset  already exists!');
      } else {
        this.toastr.showSuccessMessage('asset  added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the asset');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assetId: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
      ]],
      date: ['', [
        Validators.required,
      ]],
      assetType: ['', [
        Validators.required,
      ]],
      assetName: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
      ]],
      metaData: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      isActive: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      selectedValue: ['', [
        Validators.required,
      ]],
    });
  }

  getselectedvalue(){
    this.selectedValue= this.assetForm.get('selectedValue').value 
   }

  // createMetadata() {
  //   return this.formBuilder.group({
  //     metadata: [],
  //   });
   
  // }

  // createDataArray():void{
  //   this.clicked=false;
  //   this.mdata=this.assetForm.get('dataRows') as FormArray;
  //   this.mdata.push(this.createMetadata());
  //   console.log(this.mdata);
    
  // }

}