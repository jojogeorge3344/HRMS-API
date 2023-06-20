import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AssetReturnType } from 'src/app/models/common/types/assetreturntype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { MyAssetsService } from '../my-assets.service';
import { MyAssets } from '../my-assets.model';
import { forkJoin } from 'rxjs';
import { toNumber } from 'lodash';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { RequestType } from 'src/app/models/common/types/requesttype';
import { AssetRaiseRequest } from '@features/employee-assets/raise-request/raise-request.model';
@Component({
  selector: 'hrms-my-assets-return',
  templateUrl: './my-assets-return.component.html'
})
export class MyAssetsReturnComponent implements OnInit {
  minDateFrom;
  markDisabled;
  current: Date;
  returnTypeKeys: number[];
  returnType = AssetReturnType;
  @Input() assetData: MyAssets;
  @Input() currentUserId: number;
  returnAssetForm: FormGroup;
  returnTypeSelected: string;
  assetStatus = AssetStatus;
  requestFor = RequestFor;
  requestType = RequestType;
  raiseRequestData: any={};

  constructor(private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private myAssetService: MyAssetsService,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    var current = new Date();
    this.minDateFrom = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
    this.returnAssetForm = this.createFormGroup();
    this.returnTypeKeys = Object.keys(this.returnType).filter(Number).map(Number);
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      returnDate: [null, Validators.required],
      returnTypeOptions: [null, Validators.required],
      returnDescription: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
    });
  }
  onSubmit() {
    this.returnTypeSelected = this.returnAssetForm.get('returnTypeOptions').value;
    this.assetData.status = this.assetStatus.ReturnRequest;
    this.assetData.returnDescription = this.returnAssetForm.get('returnDescription').value;
    this.assetData.returnType = toNumber(this.returnTypeSelected);    
    // this.raiseRequestData.requestedDate= this.datepipe.transform(this.current,'yyyy/MM/dd');
    this.raiseRequestData.requestedDate = this.current;
    this.raiseRequestData.requestFor = this.requestFor.Self;
    this.raiseRequestData.requestType = this.requestType.ReturnAsset;
    this.raiseRequestData.assetTypeId = this.assetData.assetTypeId;
    this.raiseRequestData.assetTypeName=this.assetData.assetTypeName;
    this.raiseRequestData.status = this.assetStatus.ReturnRequest;
    this.raiseRequestData.empId = this.currentUserId;
    this.raiseRequestData.assetid = this.assetData.assetId;
    this.raiseRequestData.nameOfTeamMemberId = this.currentUserId;
    console.log(this.raiseRequestData);
    
    forkJoin([
      this.myAssetService.updateStatus(this.assetData),
      // this.myAssetService.insertRequest(this.raiseRequestData)
    ]).subscribe(([upRes]) => {
      this.toastr.showSuccessMessage('Request submitted successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit change request.');
      });
  }
}
