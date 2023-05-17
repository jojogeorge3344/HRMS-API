import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ToasterDisplayService } from '../../../../../core/services/toaster-service.service';

import { PayslipService } from '../payslip.service';
import { PayslipConfigurationField } from "../payslip-configuration-field.model";
import { PayslipConfiguration } from "../payslip-configuration.model";


@Component({
  templateUrl: './payslip-configuration.component.html'
})
export class PayslipConfigurationComponent implements OnInit {

  source: PayslipConfigurationField[] = [];
  target: PayslipConfigurationField[] = [];
  selectedfromAvailable: PayslipConfigurationField[] = [];
  selectedfromSelected: PayslipConfigurationField[] = [];
  paySlipForm: FormGroup;
  paySlipConfiguration: PayslipConfiguration;
  constructor(
    private payslipsService: PayslipService,
    private toasterDisplayService: ToasterDisplayService,
    private formBuilder: FormBuilder) {
    this.getPayslipConfigurationFields();
    this.getPaySlipConfiguration();
  }

  ngOnInit(): void {
    this.paySlipForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      includeFullNameOfComponents: [false, []],
      includeNotApplicableComponents: [false],
      includeLoanOrAdvanceDetails: [false],
      enablePasswordProtection: [false]
    });
  }
  getPayslipConfigurationFields() {
    this.payslipsService.getConfigurationFields()
      .subscribe(res => {
        this.source = res.filter(field => field.status === true);
        this.target = res.filter(field => field.status !== true);
        this.target = this.target.sort((a, b) => {
          return a.orders > b.orders ? 1 : a.orders < b.orders ? -1 : 0;
        });
        this.source = this.source.sort((a, b) => {
          return a.orders > b.orders ? 1 : a.orders < b.orders ? -1 : 0;
        });

      });
  }
  getPaySlipConfiguration() {
    this.payslipsService.get(4).subscribe(res => {
      this.paySlipConfiguration = res;
      this.paySlipForm.patchValue(this.paySlipConfiguration);
    });
  }
  addField($event: any) {
    this.add($event.dragData);
  }
  removeFields($event: any) {
    this.remove($event.dragData);
  }
  selectAvailable(item) {
    if (this.selectedfromAvailable.find(selectedItem => selectedItem.id === item.id) === undefined) {
      this.selectedfromAvailable.push(item);
    } else {
      this.selectedfromAvailable = this.selectedfromAvailable.filter((selectedItem => (selectedItem.id !== item.id)));
    }
    this.selectedfromSelected = [];
  }
  selectSelected(item) {
    if (this.selectedfromSelected.find(selectedItem => selectedItem.id === item.id) === undefined) {
      this.selectedfromSelected.push(item);
    } else {
      this.selectedfromSelected = this.selectedfromSelected.filter((selectedItem => (selectedItem.id !== item.id)));
    }
    this.selectedfromAvailable = [];
  }
  add(item) {
    this.target.push(item);
    this.source = this.source.filter(addedItem => addedItem.id !== item.id);
  }
  remove(item) {
    this.source.push(item);
    this.target = this.target.filter(addedItem => addedItem.id !== item.id);
  }
  interChange() {
    if (this.selectedfromAvailable.length) {
      this.selectedfromAvailable.forEach(item => {
        this.add(item);
      });
    }
    if (this.selectedfromSelected.length) {
      this.selectedfromSelected.forEach(item => {
        this.remove(item);
      });
    }
    this.selectedfromAvailable = [];
    this.selectedfromSelected = [];
  }
  checkIfSelected(id, listName) {
    const list = listName === 'available' ? this.selectedfromAvailable : this.selectedfromSelected;
    if (list.find(item => item.id === id)) {
      return true;
    }
    return false;

  }
  onSubmit() {
    let configurationUpdate;
   this.target.map((field, index) => {
      field.orders = index + 1;
      field.status = false;
    });
    this.source.map((field,index) => {
      field.orders = index + 1;
      field.status = true;

    });
    const payslip = this.paySlipForm.value;
    if (this.paySlipConfiguration.id) {
      payslip.id = this.paySlipConfiguration.id;
      configurationUpdate = this.payslipsService.update(payslip);
    } else {
      configurationUpdate = this.payslipsService.add(payslip);
    }
    forkJoin([configurationUpdate, this.payslipsService.updateConfigurationFields(this.target.concat(this.source))])
      .subscribe(([configurationRes, PayslipConfigurationFieldRes]) => {
        if (configurationRes && PayslipConfigurationFieldRes) {
          this.toasterDisplayService.showSuccessMessage('Salary slip Configuration updated successfully');
        }

      });

  } 

}
