import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { LeaveStructureService } from '../leave-structure.service';
import { LeaveComponentService } from '../../leave-component/leave-component.service';
import { LeaveConfigurationService } from '../../leave-configuration/leave-configuration.service';
import { LeaveConfigurationGeneralService } from '../../leave-configuration/leave-configuration-general.service';

import { LeaveStructureCreateComponent } from '../leave-structure-create/leave-structure-create.component';
import { LeaveStructureEditComponent } from '../leave-structure-edit/leave-structure-edit.component';
import { LeaveStructureAssignComponent } from '../leave-structure-assign/leave-structure-assign.component';

import { LeaveStructure } from '../leave-structure.model';
import { LeaveComponent } from '../../leave-component/leave-component.model';
import { LeaveConfiguration } from '@settings/leave/leave-configuration/leave-configuration.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-leave-structure-list',
  templateUrl: './leave-structure-list.component.html'
})
export class LeaveStructureListComponent implements OnInit {

  leaveStructures: LeaveStructure[];
  assignedLeaveStructures: number[] = [];
  assignedLeaveComponents: LeaveComponent[];
  allLeaveComponents: LeaveComponent[];
  leaveStructureNames: string[];

  firstOpen: number;
  searchKey: any;
  searchLeaveStructures: any;

  constructor(
    private leaveStructureService: LeaveStructureService,
    private leaveComponentService: LeaveComponentService,
    private leaveConfigurationService: LeaveConfigurationService,
    private leaveConfigurationGeneralService: LeaveConfigurationGeneralService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.firstOpen = params.leaveStructureId;
    });

    this.getLeaveStructures();
    this.getAllLeaveComponents();
    this.getAssignedLeaveStructures();
  }

  getLeaveStructures() {
    this.leaveStructureService.getAll().subscribe(result => {

      if (!this.firstOpen && result.length) {
        this.firstOpen = result[0].id;
      }

      this.getLeaveComponents(this.firstOpen);

      this.leaveStructures = result;
      this.searchLeaveStructures = result;

      this.leaveStructureNames = this.leaveStructures.map(a => a.name.toLowerCase());
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Structures');
      });
  }

  getAssignedLeaveStructures() {
    this.leaveStructureService.getAssignedLeaveStructures().subscribe(res => {
      this.assignedLeaveStructures = res;
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(leaveStructure) {
    return this.assignedLeaveStructures.includes(leaveStructure.id);
  }

  getLeaveStructure(leaveStructureId: number): LeaveStructure {
    return this.leaveStructures.find(v => v.id === leaveStructureId);
  }

  getLeaveComponents(leaveStructureId) {
    this.assignedLeaveComponents = null;

    this.leaveComponentService.getAllByLeaveStructure(leaveStructureId).subscribe(result => {
      this.assignedLeaveComponents = result;

      if (this.assignedLeaveComponents.length === 0 && this.getLeaveStructure(leaveStructureId).isConfigured) {
        this.updateConfigured(leaveStructureId, false);
      }
      this.getLeaveConfigurations(leaveStructureId);
    },
      error => {
        console.error(error);
      });
  }

  getLeaveConfigurations(leaveStructureId) {
    this.leaveConfigurationService.getAll(leaveStructureId).subscribe((result: LeaveConfiguration[]) => {
      if (this.isAllConfigured(result)) {
        this.updateConfigured(leaveStructureId, true);
      }
    },
      error => {
        console.error(error);
      });
  }

  isAllConfigured(assignedLeaveConfigurations: LeaveConfiguration[]) {
    return assignedLeaveConfigurations.every(e => e.isConfigured);
  }

  updateConfigured(leaveStructureId: number, isConfigured: boolean) {
    this.leaveStructureService.updateLeaveStructure(leaveStructureId, isConfigured).subscribe((result) => {
      this.getLeaveStructure(leaveStructureId).isConfigured = isConfigured;
    },
      error => {
        console.error(error);
      });
  }

  getAllLeaveComponents() {
    this.leaveComponentService.getAll().subscribe(result => {
      this.allLeaveComponents = result;
    },
      error => {
        console.error(error);
      });
  }

  openCreateLeaveStructure() {
    const modalRef = this.modalService.open(LeaveStructureCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.leaveStructureNames = this.leaveStructureNames;

    modalRef.result.then((result) => {
      if (!isNaN(result)) {
        this.firstOpen = result;
        this.getLeaveStructures();
      }
    });
  }

  openEditLeaveStructure(leaveStructure: LeaveStructure) {
    console.log(leaveStructure);
    const modalRef = this.modalService.open(LeaveStructureEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.leaveStructure = leaveStructure;
    modalRef.componentInstance.isDisabled = this.isDisabled(leaveStructure);
    modalRef.componentInstance.leaveStructureNames = this.leaveStructureNames.filter(v => v !== leaveStructure.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.firstOpen = leaveStructure.id;
        this.getLeaveStructures();
      }
    });
  }

  openAssignLeaveComponents(leaveStructure: LeaveStructure) {
    this.leaveComponentService.getAllByLeaveStructure(leaveStructure.id).subscribe(result => {
      this.assignedLeaveComponents = result;

      const modalRef = this.modalService.open(LeaveStructureAssignComponent,
        { centered: true, backdrop: 'static' });

      modalRef.componentInstance.leaveStructure = leaveStructure;
      modalRef.componentInstance.assignedLeaveComponents = this.assignedLeaveComponents;
      modalRef.componentInstance.allLeaveComponents = this.allLeaveComponents;

      modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getLeaveComponents(leaveStructure.id);
        }
      });
    },
      error => {
        console.error(error);
      });
  }

  openLeaveComponentConfiguration(leaveStructureId: number, leaveComponentId: number, isDisabled: boolean) {
    if (isDisabled) {
      this.router.navigate(
        ['../' + leaveStructureId + '/leave-configuration/' + leaveComponentId + '/view'],
        { relativeTo: this.route.parent });
    } else {
      this.router.navigate(
        ['../' + leaveStructureId + '/leave-configuration/' + leaveComponentId + '/edit'],
        { relativeTo: this.route.parent });
    }
  }

  deleteLeaveStructure(leaveStructure: LeaveStructure) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the leave structure "${leaveStructure.name}?"`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.leaveStructureService.delete(leaveStructure.id).subscribe(() => {
          this.toastr.showSuccessMessage('The leave structure deleted successfully!');
          this.getLeaveStructures();
        });
      }
    });
  }

  removeLeaveComponent(leaveStructure: LeaveStructure, leaveComponent: LeaveComponent) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to remove the leave component "${leaveComponent.name}?"`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        forkJoin([
          this.leaveConfigurationService.delete({
            leaveStructureId: leaveStructure.id, leaveComponentId: leaveComponent.id,
            eligibleDays: 0,
            eligibilityBase: 0,
            maxLeaveAtaTime: 0
          }),
          this.leaveConfigurationGeneralService.delete(leaveStructure.id, leaveComponent.id),
          this.leaveConfigurationGeneralService.delete(leaveStructure.id, leaveComponent.id)
        ])
          .subscribe(() => {
            this.toastr.showSuccessMessage('The leave component removed from the leave structure successfully!');
            this.getLeaveComponents(leaveStructure.id);
          });
      }
    });
  }
  searchLeaveStructure(): void {
    this.leaveStructures = this.searchLeaveStructures.filter(
      (x) =>
        x.name?.toLowerCase().includes(this.searchKey.toLowerCase()) 
    );
  }
}
