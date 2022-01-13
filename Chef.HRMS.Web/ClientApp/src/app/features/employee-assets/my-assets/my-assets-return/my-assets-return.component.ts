import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal,NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AssetReturnType } from 'src/app/models/common/types/assetreturntype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { MyAssets } from '../my-assets.model';

@Component({
  selector: 'hrms-my-assets-return',
  templateUrl: './my-assets-return.component.html'
})
export class MyAssetsReturnComponent implements OnInit {
  mindate: Date;
  markDisabled;
  returnTypeKeys: number[];
  returnType = AssetReturnType;
  @Input() assetData: MyAssets;
  @Input() currentUserId: number;
  returnAssetForm: FormGroup;


  constructor(private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.mindate = new Date();
    this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
    this.returnAssetForm = this.createFormGroup();
    this.returnTypeKeys = Object.keys(this.returnType).filter(Number).map(Number);
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      returnDate:[null, Validators.required],
      ReturnTypeOptions: [null, Validators.required],
      description: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
    });
  }
  onSubmit(){
    
  }

}
