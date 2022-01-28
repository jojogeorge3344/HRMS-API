import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AssetAssets } from '@settings/asset/asset-assets/asset-assets.model';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { forkJoin, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-changeorswap',
  templateUrl: './employee-asset-changeorswap.component.html',
})
export class EmployeeAssetChangeorswapComponent implements OnInit {
  employeeassetchangeForm: FormGroup;
  @Input() assetId;
  @Input() assetTypeId
  Astvalues: AssetAssets;
  typeMap: Map<any, any>;
  currentTypeKeys: string[];
  newTypeKeys: string[];
  assetList: any[];
  dataType: any[];
  newAsssetTypeId: any;
  unallocatedAssets: {};

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private assestassetService: AssetAssetsService,
    private assetMetadataService: AssetMetadataService,
    private employeAssetService: EmployeAssetService,
    private assetTypeService: AssetTypeService,
  ) { }

  ngOnInit(): void {
    this.typeMap = new Map();
    this.employeeassetchangeForm = this.createFormGroup();
    this.getCurrentAssetById();
    this.getAssetType();
  }
  onSubmit() {

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      valueId: ['', [
        Validators.required,
      ]],
      assetName: ['', [
        Validators.required,
      ]],
      metadatas: this.formBuilder.group([]),

      newAssetType: [ '', [
        Validators.required,
      ]],
      newAssetId: ['', [
        Validators.required,
      ]],
      newAssetName: ['', [
        Validators.required,
      ]],
      newMetadatas: this.formBuilder.group([]),
      newDescription: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      
    });
  }


  getCurrentAssetById() {
    forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.assetTypeId),
      this.assestassetService.getAssetById(this.assetId)
    ])
      .subscribe(([metadatas, asset]) => {
        metadatas.forEach(mdata => {
          this.typeMap.set(mdata.metadata, mdata);
          (this.employeeassetchangeForm.get('metadatas') as FormGroup).addControl(mdata['metadata'], new FormControl('', [Validators.required]));})
        this.currentTypeKeys = [...this.typeMap.keys()];
        let mdatavalue = {}
        this.currentTypeKeys.map(key => {
          mdatavalue[key] = asset.assetMetadataValues.find(mvalue => mvalue.assettypeMetadataId === this.typeMap.get(key).id)?.value || ''
        });
        this.employeeassetchangeForm.patchValue({
          ...asset,
          metadatas: mdatavalue,
        });
        this.Astvalues = asset;
      })
  }

  getAssetType(){
    this.assetTypeService.getAll().subscribe(result => {
      this.dataType=result;
      console.log(this.dataType);     
    })
  }
  
  getUnallocatedAssets(ev){
    console.log(ev.target.value, this.employeeassetchangeForm.controls.newAssetType.value);
    const evevalue =  this.employeeassetchangeForm.controls.newAssetType.value;
    this.employeAssetService.getUnallocatedAssets(evevalue).subscribe(res => {
      this.unallocatedAssets=res;
      console.log(this.unallocatedAssets);
      
    })
  }



  formatter = (employee) => employee.employeecode;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.assetList.filter((employee:any) => new RegExp(term, 'mi').test(employee.employeecode)).slice(0, 10))
  )

  // getEmployeeList() {
  //   this.employeAssetService.getEmployeeDetails().subscribe(result => {
  //     let currentDepartment = _.find(result,['empid',this.currentUserId]).department
  //     console.log(currentDepartment,"bllll");
      
  //     this.assetList = result.filter(employee => (employee.empid !== this.currentUserId && employee.department == currentDepartment));      
  //   },
  //     error => {
  //       console.error(error);
  //     });
  // }



  

}
