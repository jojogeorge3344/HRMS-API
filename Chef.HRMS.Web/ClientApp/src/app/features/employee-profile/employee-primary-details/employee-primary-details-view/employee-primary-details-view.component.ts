import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeBasicDetailsService } from '@features/employee/employee-basic-details/employee-basic-details.service'
import { GenderType } from '../../../../models/common/types/gendertype';
import { BloodGroupType } from '../../../../models/common/types/bloodgrouptype';
import { MaritalStatusType } from '../../../../models/common/types/maritalstatustype';

import { EmployeePrimaryDetailsEditComponent } from "../employee-primary-details-edit/employee-primary-details-edit.component";
import { getCurrentUserId } from '@shared/utils/utils.functions';


@Component({
  selector: 'hrms-employee-primary-details-view',
  templateUrl: './employee-primary-details-view.component.html'
})
export class EmployeePrimaryDetailsViewComponent implements OnInit, OnDestroy {

  primarydetails;
  genderTypes = GenderType;
  bloodGroupType = BloodGroupType
  maritalStatusType = MaritalStatusType
  currentUserId: number;

  constructor(public modalService: NgbModal,
    private basicdetailsService: EmployeeBasicDetailsService) { }

  ngOnDestroy(): void {
     this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId()
    this.getprimaryDetails()
  }

  getprimaryDetails() {
    this.basicdetailsService.get(this.currentUserId).subscribe(res => {
      this.primarydetails = res;
    })
  }

  openEdit() {
    const modalRef = this.modalService.open(EmployeePrimaryDetailsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employeeId = this.currentUserId;
    modalRef.componentInstance.id = this.primarydetails ? this.primarydetails.id : 0;
    modalRef.componentInstance.primaryDetails = this.primarydetails;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getprimaryDetails();
      }
    },
      error => {
        console.log(error)
      });
  }
}
