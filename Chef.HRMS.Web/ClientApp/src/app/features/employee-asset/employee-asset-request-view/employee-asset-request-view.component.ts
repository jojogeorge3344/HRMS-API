import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetRaiseRequest } from '@features/employee-assets/raise-request/raise-request.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { switchMap,tap } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { RequestType } from 'src/app/models/common/types/requesttype';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { EmployeAssetService } from '../employe-asset.service';
import { EmployeeAssetAllocationComponent } from '../employee-asset-allocation/employee-asset-allocation.component';

@Component({
  selector: 'hrms-employee-asset-request-view',
  templateUrl: './employee-asset-request-view.component.html',
})
export class EmployeeAssetRequestViewComponent implements OnInit {
  @Input() id;
  @Input() empid;
  @Input() assetTypeId;
  @Input() assetTypeName;
  // empid: number;
  assetId:number
  assetRaiseRequestId:number;
  result: any;
  requestedById:any;
  status=AssetStatus;
  reqForStatus=RequestFor;
  currentUserId: number;
  employeeWiseRequest: AssetRaiseRequest;
  requestViewForm: FormGroup;
  requetedByName: string;
  buttonStatus: number;
  requestType=RequestType;
  requestResult=[];


  constructor(
              private employeeAsset: EmployeAssetService,
              private route: ActivatedRoute,
              public activeModal: NgbActiveModal,
              private router: Router,
              private toastr: ToasterDisplayService,
              private formBuilder: FormBuilder,
              public modalService: NgbModal,
              private splitByUpperCase: SplitByUpperCasePipe
               ) { }

  ngOnInit(): void {
    this.requestViewForm = this.createFormGroup();
    this.getRequestById();
    console.log(this.reqForStatus);
  }

 

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      requestNo: ['', [
        Validators.required,
      ]],
      requestedBy: ['', []],
      requestedDate: ['', [
        Validators.required,
      ]],
      assetTypeName: ['', [
        Validators.required,
      ]],
      requestType: ['', [
        Validators.required,
      ]],
      requestFor: ['', []],
      nameOfTeamMember: ['', [
        Validators.required,
        // Validators.maxLength(32),
        // Validators.pattern('^([a-zA-Z0-9 ])+$'),
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
    });
  }

  getRequestById() {
    this.employeeAsset.getRequestById(this.id).pipe(
      tap(([result]) => {
        this.requestViewForm.patchValue(result);
        if(result.requestFor==2){
          this.requestViewForm.patchValue({nameOfTeamMember:result.nameOfTeamMember})
        }
        else{
          this.requestViewForm.patchValue({nameOfTeamMember:null})
        }
        this.requestViewForm.patchValue({requestFor:this.splitByUpperCase.transform(this.reqForStatus[result.requestFor])})
        this.requestViewForm.patchValue({requestType:this.splitByUpperCase.transform(this.requestType[result.requestType])})
        this.requestResult=result;
        console.log("request result",this.requestResult);
        
        this.buttonStatus=result.status;
        console.log("request view details",result);
        
      }),
      switchMap(([result]) =>  (this.employeeAsset.getEmployeeNameById(result.empId))
    ))
    .subscribe(([result]) => {
      this.requetedByName=`${result.firstName} ${result.lastName}`;
        this.requestViewForm.patchValue(result)
      });
  }


 

     

     

}
