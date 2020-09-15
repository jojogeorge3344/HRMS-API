import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-employee-identity-documents-container',
  templateUrl: './employee-identity-documents-container.component.html'
})
export class EmployeeIdentityDocumentsContainerComponent implements OnInit {

  drivingLicense;
  passport;
  pan;
  uid;
  bankDetails;

  constructor() { }

  ngOnInit(): void {
  }

  setData(documentType: string, documentData: any) {
    if (documentType === '1') {
      this.drivingLicense = documentData;
    }

    if (documentType === '2') {
      this.passport = documentData
    }

    if (documentType === '3') {
      this.pan = documentData;
    }

    if (documentType === '4') {
      this.uid = documentData;
    }

    if (documentType === '5') {
      this.bankDetails = documentData;
    }
  }

  beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === '1' && this.drivingLicense === null) {
      $event.preventDefault();
    }

    if ($event.panelId === '2' && this.passport === null) {
      $event.preventDefault();
    }

    if ($event.panelId === '3' && this.pan === null) {
      $event.preventDefault();
    }

    if ($event.panelId === '4' && this.uid === null) {
      $event.preventDefault();
    }

    if ($event.panelId === '5' && this.bankDetails === null) {
      $event.preventDefault();
    }
  }
}
