import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetRaiseRequest } from '@features/employee-assets/raise-request/raise-request.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { switchMap,tap } from 'rxjs/operators';
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
  requestedById:any;
  status=AssetStatus;
  currentUserId: number;
  employeeWiseRequest: AssetRaiseRequest;
  requestViewForm: FormGroup;
  requetedByName: string;


  constructor(
              private employeeAsset: EmployeAssetService,
              private route: ActivatedRoute,
              public activeModal: NgbActiveModal,
              private router: Router,
              private toastr: ToasterDisplayService,
              private formBuilder: FormBuilder,
               ) { }

  ngOnInit(): void {
    this.requestViewForm = this.createFormGroup();
    this.getRequestById();
    // this.getEmployeeNameById()
    
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
      }),
      switchMap(([result]) =>  (this.employeeAsset.getEmployeeNameById(result.empId))
    ))
    .subscribe(([result]) => {
      this.requetedByName=`${result.firstName} ${result.lastName}`;
        this.requestViewForm.patchValue(result)
      });
  }


  manageRequest(id,status) {
    console.log(id);
       this.employeeAsset.manageRequest(id,status).subscribe(res=>{
        this.toastr.showSuccessMessage('successfully!');
         this.getRequestById();
       })
      
   }




}
