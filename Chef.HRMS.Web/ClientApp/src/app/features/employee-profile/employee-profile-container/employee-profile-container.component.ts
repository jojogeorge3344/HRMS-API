import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeePrimaryDetailsViewComponent } from "../employee-primary-details/employee-primary-details-view/employee-primary-details-view.component";
import { EmployeeContactDetailsViewComponent } from "../employee-contact-details/employee-contact-details-view/employee-contact-details-view.component";
import { EmployeeAddressDetailsViewComponent } from "../employee-address-details/employee-address-details-view/employee-address-details-view.component";
import { EmployeeDependentDetailsListComponent } from "../employee-dependent-details/employee-dependent-details-list/employee-dependent-details-list.component";

@Component({
  templateUrl: './employee-profile-container.component.html'
})
export class EmployeeProfileContainerComponent implements OnInit {

  @ViewChild(EmployeePrimaryDetailsViewComponent) primary: EmployeePrimaryDetailsViewComponent
  @ViewChild(EmployeeContactDetailsViewComponent) contact: EmployeeContactDetailsViewComponent
  @ViewChild(EmployeeAddressDetailsViewComponent) address: EmployeeAddressDetailsViewComponent
  @ViewChild(EmployeeDependentDetailsListComponent) dependent: EmployeeDependentDetailsListComponent

  constructor() { }

  ngOnInit(): void {
  }

}
