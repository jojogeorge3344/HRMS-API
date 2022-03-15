import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { EmployeeDependentDetailsService } from '../employee-dependent-details.service';
import { GenderType } from '../../../../models/common/types/gendertype';
import { RelationshipType } from '../../../../models/common/types/relationshiptype';
import { EmployeeDependentDetails } from '../employee-dependent-details.model';

import { EmployeeDependentDetailsCreateComponent } from '../employee-dependent-details-create/employee-dependent-details-create.component';
import { EmployeeDependentDetailsEditComponent } from '../employee-dependent-details-edit/employee-dependent-details-edit.component';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-dependent-details-list',
  templateUrl: './employee-dependent-details-list.component.html'
})
export class EmployeeDependentDetailsListComponent implements OnInit {

  dependents: EmployeeDependentDetails[];
  genderTypes = GenderType;
  relationshipTypes = RelationshipType;

  userId: number;

  constructor(
    private dependentService: EmployeeDependentDetailsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.userId = getCurrentUserId();
    this.getDependents();

  }
  getDependents() {
    this.dependentService.getAll(this.userId)
      .subscribe(result => {
        this.dependents = result;
      });
  }
  openAdd() {
    const modalRef = this.modalService.open(EmployeeDependentDetailsCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.currentUserId = this.userId;
    modalRef.componentInstance.dependents = this.dependents;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getDependents();
      }
    }, error => console.log(error));

  }
  openEditDependent(id: number, dependent: EmployeeDependentDetails) {
    const modalRef = this.modalService.open(EmployeeDependentDetailsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.currentUserId = this.userId;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.dependent = dependent;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getDependents();
      } else {
        dependent.phone = `+${dependent.phoneCode}-${dependent.phone}`
      }
    }, error => {
      dependent.phone = `+${dependent.phoneCode}-${dependent.phone}`;
      console.log(error);
    }
    );

  }
  deleteDependent(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the details of dependent ${name}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.dependentService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The dependent deleted successfully!');
          this.getDependents();
        });
      }
    });
  }

}
