import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { LeaveComponentCreateComponent } from '../leave-component-create/leave-component-create.component';
import { LeaveComponentEditComponent } from '../leave-component-edit/leave-component-edit.component';
import { LeaveComponentService } from '../leave-component.service';
import { LeaveComponent } from '../leave-component.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-leave-component-list',
  templateUrl: './leave-component-list.component.html'
})
export class LeaveComponentListComponent implements OnInit {

  leaveComponents: any;
  assignedLeaveComponents: number[] = [];
  leaveComponentNames: string[];
  leaveComponentCodes: string[];

  constructor(
    private leaveComponentService: LeaveComponentService,
    private toastr: ToasterDisplayService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllLeaveComponents();
    this.getAssignedLeaveComponents();
  }

  getAllLeaveComponents() {
    this.leaveComponentService.getAll().subscribe(res => {
      this.leaveComponents = res;
      this.leaveComponentNames = this.leaveComponents.map(a => a.name.toLowerCase());
      this.leaveComponentCodes = this.leaveComponents.map(a => a.code.toLowerCase());
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the leave components');
    });
  }

  getAssignedLeaveComponents() {
    this.leaveComponentService.getAssignedLeaveComponents().subscribe(res => {
      this.assignedLeaveComponents = res;
    },
    error => {
      console.error(error);
    });
  }

  isDisabled(leaveComponent) {
    return this.assignedLeaveComponents.includes(leaveComponent.id);
  }

  openCreateLeaveComponent() {
    const modalRef = this.modalService.open(LeaveComponentCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.leaveComponentNames = this.leaveComponentNames;
    modalRef.componentInstance.leaveComponentCodes = this.leaveComponentCodes;

    modalRef.result.then((result) => {
        if (result) {
          this.getAllLeaveComponents();
        }
      });
  }

  openEditLeaveComponent(leaveComponent: LeaveComponent) {
    console.log(leaveComponent);
    const modalRef = this.modalService.open(LeaveComponentEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.leaveComponent = leaveComponent;
    modalRef.componentInstance.isDisabled = this.isDisabled(leaveComponent);
    modalRef.componentInstance.leaveComponentNames = this.leaveComponentNames.filter(v => v !== leaveComponent.name.toLowerCase());
    modalRef.componentInstance.leaveComponentCodes = this.leaveComponentCodes.filter(v => v !== leaveComponent.code.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLeaveComponents();
      }
    });
  }

  deleteLeaveComponent(leaveComponent: LeaveComponent) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the leave component "${leaveComponent.name}?"`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.leaveComponentService.delete(leaveComponent.id).subscribe(() => {
          this.toastr.showSuccessMessage('The leave component deleted successfully!');
          this.getAllLeaveComponents();
        });
      }
    });
  }
}
