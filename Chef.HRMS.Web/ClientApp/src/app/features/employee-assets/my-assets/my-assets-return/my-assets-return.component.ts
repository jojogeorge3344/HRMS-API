import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AssetReturnType } from 'src/app/models/common/types/assetreturntype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { MyAssetsService } from '../my-assets.service';
import { MyAssets } from '../my-assets.model';
import { toNumber } from 'lodash';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

@Component({
  selector: 'hrms-my-assets-return',
  templateUrl: './my-assets-return.component.html'
})
export class MyAssetsReturnComponent implements OnInit {
  minDateFrom;
  markDisabled;
  returnTypeKeys: number[];
  returnType = AssetReturnType;
  @Input() assetData: MyAssets;
  @Input() currentUserId: number;
  returnAssetForm: FormGroup;
  returnTypeSelected: string;
  assetStatus = AssetStatus;


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
    this.myAssetService.updateStatus(this.assetData).subscribe(result => {
      this.toastr.showSuccessMessage('return request submitted successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit change request.');
      });
  }
}


