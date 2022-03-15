import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { EmployeeAddressDetailsService } from '../employee-address-details.service';
import { StateService } from '@settings/branch/state.service';
import { CountryService } from '@settings/branch/country.service';
import { EmployeeAddressDetails } from '../employee-address-details.model';

import { EmployeeAddressDetailsEditComponent } from '../employee-address-details-edit/employee-address-details-edit.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';

@Component({
  selector: 'hrms-employee-address-details-view',
  templateUrl: './employee-address-details-view.component.html'
})
export class EmployeeAddressDetailsViewComponent implements OnInit {

  public countries: any;
  public states: any;
  address: EmployeeAddressDetails;
  currentCountry: any;
  permanentCountry: any;
  currentState: any;
  permanentState: any;
  userId: number;

  constructor(private addressService: EmployeeAddressDetailsService,
    public modalService: NgbModal,
    private stateService: StateService,
    private countryService: CountryService) { }

  ngOnInit(): void {
    this.userId = getCurrentUserId()
    this.getaddress()

  }
  getaddress() {
    this.addressService.get(this.userId).subscribe(res => {
      if (res.length)
        this.address = res[0];
      this.getCountires()
      this.getStates()

    })

  }

  getCountires() {
    this.countryService.getAll().subscribe(result => {
      this.countries = result;
      if (this.address) {
        this.currentCountry = _.find(result, { id: this.address.currentCountry })
        this.permanentCountry = _.find(result, { id: this.address.permanentCountry })
      }
    },
      error => {
        console.error(error);
      });
  }

  getStates() {
    this.stateService.getAll().subscribe(result => {
      this.states = result;
      if (this.address) {
        this.currentState = _.find(result, { id: this.address.currentState })
        this.permanentState = _.find(result, { id: this.address.permanentState })
      }
    },
      error => {
        console.error(error);
      });
  }

  openEdit() {
    const modalRef = this.modalService.open(EmployeeAddressDetailsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.userId;
    modalRef.componentInstance.id = this.address ? this.address.id : 0;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.states = this.states;
    modalRef.componentInstance.address = this.address;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getaddress();
      }
    }, error => {
      console.log(error)
    });
  }
}
