import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeWpsService } from '../employee-wps.service';
import { WpsGroup } from '../wps-model';
import { EmployeeWpsCreateComponent } from '../employee-wps-create/employee-wps-create.component';
import { EmployeeWpsEditComponent } from '../employee-wps-edit/employee-wps-edit.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-wps-list',
  templateUrl: './employee-wps-list.component.html',
  styleUrls: ['./employee-wps-list.component.scss']
})
export class EmployeeWpsListComponent implements OnInit {

  wpsDetails: WpsGroup[] = [];
  groupCodes: string[];
  establishmentId: string[];
  groupNames: string[];

  constructor(
    private employeeWpsService: EmployeeWpsService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getWPSlist();
  }

  getWPSlist() {
    this.employeeWpsService.getAll().subscribe(result => {
      this.wpsDetails = result;
      this.groupCodes = this.wpsDetails.map(a => a.groupCode.toLowerCase());
      this.groupNames = this.wpsDetails.map(a => a.groupName.toLowerCase());
      this.establishmentId = this.wpsDetails.map(a => a.establishmentId.toLowerCase());

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the WPS List Details');
    });
  }

  openCreate() {
    const modalRef = this.modalService.open(EmployeeWpsCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.groupCodes = this.groupCodes;
    modalRef.componentInstance.groupNames = this.groupNames;
    modalRef.componentInstance.establishmentId = this.establishmentId;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getWPSlist();
        }
    });  }

    openEdit(wpsDetails: WpsGroup) {
      const modalRef = this.modalService.open(EmployeeWpsEditComponent,
        { size: 'lg', centered: true, backdrop: 'static' });
      modalRef.componentInstance.wpsDetails = wpsDetails;
      modalRef.componentInstance.groupCodes = this.groupCodes;
      modalRef.componentInstance.groupNames = this.groupNames;
      modalRef.componentInstance.establishmentId = this.establishmentId;
      console.log('Details', wpsDetails);

      modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getWPSlist();
        }
      });
    }

  delete(wpsDetails: WpsGroup) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the WPS ${wpsDetails.groupName}`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeWpsService.delete(wpsDetails.id).subscribe(() => {
          this.toastr.showSuccessMessage('WPS deleted successfully!');
          this.getWPSlist();
        });
      }
    });
  }

}
