import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OvertimePolicyService } from '../overtime-policy.service';
import { OvertimePolicyCreateComponent } from '../overtime-policy-create/overtime-policy-create.component';
import { OvertimePolicyEditComponent } from '../overtime-policy-edit/overtime-policy-edit.component';
import { OvertimePolicyViewComponent } from '../overtime-policy-view/overtime-policy-view.component';
import { AttendanceHoursType } from '../../../../../models/common/types/attendancehourstype';
import { OvertimePolicy } from '../overtime-policy.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-overtime-policy-list',
  templateUrl: './overtime-policy-list.component.html'
})

export class OvertimePolicyListComponent implements OnInit {
  public overtimePolicies: OvertimePolicy[];
  assignedOvertimePolicies: number[] = [];
  overtimePolicyNames: string[];

  attendanceHoursTypes = AttendanceHoursType;
  attendanceHoursTypeKeys: number[];

  constructor(
    private overtimePolicyService: OvertimePolicyService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService) {
      this.attendanceHoursTypeKeys = Object.keys(this.attendanceHoursTypes).filter(Number).map(Number);
  }

  ngOnInit(): void {
    this.getOvertimePolicies();
    this.getAssignedOvertimePolicies();
  }

  getOvertimePolicies() {
    this.overtimePolicyService.getAllAssignedOverTimePolicyCount().subscribe((result: OvertimePolicy[]) => {
      this.overtimePolicies = result;
      this.overtimePolicies=result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
      this.overtimePolicyNames = this.overtimePolicies.map(a => a.name.toLowerCase());
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the overtime policies');
    });
  }

  getAssignedOvertimePolicies() {
    this.overtimePolicyService.getAssignedOvertimePolicies().subscribe(res => {
      this.assignedOvertimePolicies = res;
    },
    error => {
      console.error(error);
    });
  }

  isDisabled(overtimePolicy) {
    return this.assignedOvertimePolicies.includes(overtimePolicy.id);
  }

  openCreate() {
    const modalRef = this.modalService.open(OvertimePolicyCreateComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.attendanceHoursTypes = this.attendanceHoursTypes;
    modalRef.componentInstance.attendanceHoursTypeKeys = this.attendanceHoursTypeKeys;
    modalRef.componentInstance.overtimePolicyNames = this.overtimePolicyNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimePolicies();
      }
    });
  }

  openEdit(overtimePolicy: OvertimePolicy) {
    const modalRef = this.modalService.open(OvertimePolicyEditComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.overtimePolicy = overtimePolicy;
    modalRef.componentInstance.attendanceHoursTypes = this.attendanceHoursTypes;
    modalRef.componentInstance.attendanceHoursTypeKeys = this.attendanceHoursTypeKeys;
    modalRef.componentInstance.isDisabled = this.isDisabled(overtimePolicy);
    modalRef.componentInstance.overtimePolicyNames = this.overtimePolicyNames.filter(v => v !== overtimePolicy.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimePolicies();
      }
    });
  }

  openView(overtimePolicy: OvertimePolicy) {
    const modalRef = this.modalService.open(OvertimePolicyViewComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.overtimePolicy = overtimePolicy;
    modalRef.componentInstance.attendanceHoursTypes = this.attendanceHoursTypes;
    modalRef.componentInstance.attendanceHoursTypeKeys = this.attendanceHoursTypeKeys;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimePolicies();
      }
    });
  }

  openConfigure(overtimePolicy) {
    if (overtimePolicy.isConfigured) {
      this.router.navigate(['./overtime-policy-configuration/' + overtimePolicy.id + '/edit'], { relativeTo: this.route.parent });
    } else {
      this.router.navigate(['./overtime-policy-configuration/' + overtimePolicy.id + '/create'], { relativeTo: this.route.parent });
    }
  }

  delete(overtimePolicy: OvertimePolicy) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the overtime policy ${overtimePolicy.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.overtimePolicyService.delete(overtimePolicy.id).subscribe(() => {
          this.toastr.showSuccessMessage('The overtime policy is deleted successfully!');
          this.getOvertimePolicies();
        });
      }
    });
  }
}
