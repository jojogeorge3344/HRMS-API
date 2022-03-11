import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { componentDestroyed } from '@shared/utils/component.destroyed';
import { takeUntil } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-reject-revoke',
  templateUrl: './employee-asset-reject-revoke.component.html',
})
export class EmployeeAssetRejectRevokeComponent implements OnInit, OnDestroy {

  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;
  @Input() status;
  @Input() emprequest;
  rejectRevokeForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private employeeAsset: EmployeAssetService,
              private toastr: ToasterDisplayService,) { }


  ngOnDestroy(): void { }

  ngOnInit(): void {
    this.rejectRevokeForm = this.createFormGroup();
    console.log("values", this.status, this.emprequest);  
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      reason: ['', [
        Validators.required, , Validators.maxLength(150)
      ]]
    });
  }

  onSubmit() {
    let allValues= {...this.rejectRevokeForm.getRawValue()}
    let changeValues={reason:allValues.reason}
    console.log("valuezzzz>>>",this.rejectRevokeForm.getRawValue(), allValues.reason, this.status);
    
    this.employeeAsset
      .manageRequest(this.emprequest,this.status,allValues.reason)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((res) => {
       console.log("response>>>",res);
      });
              if (this.status == 3) {
                this.toastr.showSuccessMessage("Request Rejected Successfully!");
              }
              else if (this.status == 6) {
                this.toastr.showSuccessMessage("Request Revoked Successfully!");
              }
              else {
              this.toastr.showErrorMessage("Can not do that!!!")
              }
  }



  

}
