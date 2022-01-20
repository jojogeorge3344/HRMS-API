import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetRaiseRequest } from '@features/employee-assets/raise-request/raise-request.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-request-view',
  templateUrl: './employee-asset-request-view.component.html',
})
export class EmployeeAssetRequestViewComponent implements OnInit {
  @Input() id;
  @Input() empid;
  // empid: number;
  assetId:number
  assetRaiseRequestId:number;
  result: any;
  status=AssetStatus;
  currentUserId: number;
  employeeWiseRequest: AssetRaiseRequest;
  requestViewForm: FormGroup;


  constructor(
              private employeeAsset: EmployeAssetService,
              private route: ActivatedRoute,
              public activeModal: NgbActiveModal,
              private router: Router,
              private toastr: ToasterDisplayService,
              private formBuilder: FormBuilder,
               ) { }

  ngOnInit(): void {
    // this.currentUserId = getCurrentUserId();
    // this.route.params.subscribe((params: Params) => {
    //   this.empid = params.id;
    // });
    this.requestViewForm = this.createFormGroup();
    this.getEmployeeRequestById();
    
  }

  onSubmit() {

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
      assetTypeId: ['', [
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

  getEmployeeRequestById() {
    return this.employeeAsset.getEmployeeRequestById(this.id).subscribe(result => {
      console.log(this.id);
        // this.employeeWiseRequest = result;
        this.requestViewForm.patchValue(result)
        debugger;
      });
  }

  manageRequest(empreq,status) {
    //  const parameters={assetId:this.assetId,requestId:this.assetRaiseRequestId,status:2}
    console.log(empreq.id);
       this.employeeAsset.manageRequest(empreq.id,status).subscribe(res=>{
         this.getEmployeeRequestById();
       })
      
   }




}
