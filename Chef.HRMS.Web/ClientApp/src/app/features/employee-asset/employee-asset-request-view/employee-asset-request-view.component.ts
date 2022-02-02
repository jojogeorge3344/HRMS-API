import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetRaiseRequest } from '@features/employee-assets/raise-request/raise-request.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { switchMap,tap } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { RequestFor } from 'src/app/models/common/types/requestfor';
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
  reqForStatus=RequestFor;
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
              public modalService: NgbModal,
               ) { }

  ngOnInit(): void {
    this.requestViewForm = this.createFormGroup();
    this.getRequestById();
    console.log(this.reqForStatus);
    
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
        this.requestViewForm.patchValue({requestFor:this.reqForStatus[result.requestFor]})
        console.log(result);
        
      }),
      switchMap(([result]) =>  (this.employeeAsset.getEmployeeNameById(result.empId))
    ))
    .subscribe(([result]) => {
      this.requetedByName=`${result.firstName} ${result.lastName}`;
        this.requestViewForm.patchValue(result)
      });
  }


  manageRequest(id,status) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
      debugger;
      if(id==2){
        modalRef.componentInstance.confirmationMessage = `Are you sure you want to approve the request ?`;
      }
      else if(id==3){
        modalRef.componentInstance.confirmationMessage = `Are you sure you want to reject the request ?`;
      }
     
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeAsset.manageRequest(id,status).subscribe(() => {
           this.toastr.showSuccessMessage('asset recalled successfully!');
          ;
        });
      }
    });
    // this.getAllocatedAssetsById()
  }

  // manageRequest(id,status) {
  //   console.log(id);
  //      this.employeeAsset.manageRequest(id,status).subscribe(res=>{
  //       this.toastr.showSuccessMessage('successfully!');
  //        this.getRequestById();
  //      })
      
  //  }




}
