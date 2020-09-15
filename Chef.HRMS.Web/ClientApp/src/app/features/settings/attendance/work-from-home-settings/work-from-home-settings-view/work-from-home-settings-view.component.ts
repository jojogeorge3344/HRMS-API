import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { WorkFromHomeSettingsService } from "../work-from-home-settings.service";
import { WorkFromHomeSettings } from "../work-from-home-settings.model";
import { WorkFromHomePeriodType } from 'src/app/models/common/types/workfromhomeperiodtype';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './work-from-home-settings-view.component.html'
})
export class WorkFromHomeSettingsViewComponent implements OnInit {

  viewForm: FormGroup;
  periodTypes = WorkFromHomePeriodType;
  periodTypeKeys: Number[];
  type: string = null;
  
  constructor(private workFromHomeSettingsService: WorkFromHomeSettingsService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {      
      this.periodTypeKeys = Object.keys(this.periodTypes).filter(Number).map(Number);
    }

  ngOnInit(): void {
    this.viewForm = this.createFormGroup();

    this.route.queryParams.subscribe((params:any) => {
      this.type = params['type'];
    });
      
    this.getWorkFromHomeSettings();
  }

  getWorkFromHomeSettings() {
    this.workFromHomeSettingsService.get().subscribe((result: WorkFromHomeSettings) => {
      if(!result) {
        this.type="create";
      }
      else {        
        this.viewForm.patchValue(result);
        this.viewForm.disable();
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      approvalWorkflowId: [1],
      isEnabled: [false],
      isLimited: [{ value: false, disabled: true}],
      maximumLimit: [{ value: null, disabled: true}, [
        Validators.required, 
        Validators.min(1)
      ]],
      periodType: [{ value: null, disabled: true}, [
        Validators.required
      ]]
    });
  }
}