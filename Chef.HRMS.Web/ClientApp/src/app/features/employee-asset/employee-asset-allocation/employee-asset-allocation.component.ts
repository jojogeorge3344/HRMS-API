import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AssetTypeService } from "@settings/asset/asset-type/asset-type.service";
import { switchMap, tap } from "rxjs/operators";
import { EmployeAssetService } from "../employe-asset.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "hrms-employee-asset-allocation",
  templateUrl: "./employee-asset-allocation.component.html",
})
export class EmployeeAssetAllocationComponent implements OnInit {
  @Input() reqId;
  @Input() empid;
  allocationDate: Date = new Date();
  reqData = {};
  typeid: number;
  reqDetails: any;
  assetList = [];
  dataType = [];
  unallocatedAssets:any[]=[];
  unallocatedAssetsOndisplay:any[]=[];
  assetAllocationForm: FormGroup;
  requetedBy: string;
  searchParameter = '';
  componentsArray = [];
  filteredArray: any;

  constructor(
    private employeeAsset: EmployeAssetService,
    private assetTypeService: AssetTypeService,
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assetAllocationForm = this.createFormGroup();
    this.getAllocationDetails();
    this.getAssetType();
  }

  onSubmit() {}

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      allocationId: ["", [Validators.required]],
      requestedBy: ["", []],
      // allocationDate: [new Date(Date.now()), [Validators.required]],
      description: ["", [Validators.required]],
      allocationTo: ["", [Validators.required]],
      requestNo: ["", [Validators.required]],
      CommentsAllocator: ["", [Validators.required]],
    });
  }

  getAllocationDetails() {
    this.employeeAsset
      .getAllocationDetails(this.reqId)
      .pipe(
        tap(([result]) => {
          this.assetAllocationForm.patchValue(result);
          this.reqDetails = result;
          console.log(this.reqDetails);
        }),
        switchMap(([result]) =>
          this.employeeAsset.getEmployeeNameById(result.requestedBy)
        )
      )
      .subscribe(([result]) => {
        this.requetedBy = `${result.firstName} ${result.lastName}`;
        this.assetAllocationForm.patchValue({ requestedBy: this.requetedBy });
      });
  }

  getAssetType() {
    this.assetTypeService.getAll().subscribe((result) => {
      this.dataType = result;
      console.log("assettype", this.dataType);
    });
  }

  getUnallocatedAssets(ev) {
    console.log(ev.target.value);
    this.typeid = ev.target.value;
    this.employeeAsset.GetAssetAndMetadataDetails(this.typeid).subscribe((res) => {
      this.unallocatedAssets = this.unallocatedAssetsOndisplay = res;
      console.log("unallocated", this.unallocatedAssets);
  
    });
  }

  filterArray() {
    if (!this.searchParameter) {
      this.unallocatedAssetsOndisplay = this.unallocatedAssets;
    } else {
      const searchResult = [];
      const delimiter = '~!~';
      this.unallocatedAssets.forEach(ast => {
       let combinedString = ast.assetName + delimiter + ast.assetId + delimiter
                            + ast.description + delimiter+ ast.metadataValue1 + delimiter
                            + ast.metadataValue2 + delimiter+ ast.metadataValue1 + delimiter
                            + ast.metadataValue4 + delimiter+ ast.metadataValue5 + delimiter;
   
        if (combinedString.toLowerCase().indexOf(this.searchParameter.toLowerCase()) !== -1) {
        searchResult.push(ast);
        }
        console.log(combinedString);
      });
      this.unallocatedAssetsOndisplay = searchResult;
    }
  }

 
          

          
         

      
  
  
}

