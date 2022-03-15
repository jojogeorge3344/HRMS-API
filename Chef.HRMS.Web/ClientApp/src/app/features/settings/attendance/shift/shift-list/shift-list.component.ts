import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { Shift } from '../shift.model';
import { ShiftService } from '../shift.service';

import { ShiftCreateComponent } from '../shift-create/shift-create.component';
import { ShiftEditComponent } from '../shift-edit/shift-edit.component';
import { ShiftViewComponent } from '../shift-view/shift-view.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-shift-list',
  templateUrl: './shift-list.component.html',
  //styles:''
})

export class ShiftListComponent implements OnInit, OnDestroy {

  shifts: Shift[];
  assignedShifts: number[] = [];
  shiftNames: string[];

  constructor(
    private shiftService: ShiftService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) { }

  ngOnDestroy(): void {
  this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.getShifts();
    this.getAssignedShifts();
  }

  getAssignedShifts() {
    this.shiftService.getAssignedShifts().subscribe(res => {
      this.assignedShifts = res;
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(shift) {
    return this.assignedShifts.includes(shift.id);
  }

  openCreate() {
    const modalRef = this.modalService.open(ShiftCreateComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.shiftNames = this.shiftNames;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getShifts();
      }
    });
  }

  openEdit(shift: Shift) {

    const modalRef = this.modalService.open(ShiftEditComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.shiftNames = this.shiftNames.filter(v => v !== shift.name.toLowerCase());
    modalRef.componentInstance.shift = shift;
    modalRef.componentInstance.isDisabled = this.isDisabled(shift);

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getShifts();
      }
    });
  }

  openView(shift: Shift) {
    const modalRef = this.modalService.open(ShiftViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.shift = shift;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getShifts();
      }
    });
  }

  delete(shift: Shift) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the shift ${shift.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.shiftService.delete(shift.id).subscribe(() => {
          this.toastr.showSuccessMessage('The shift is deleted successfully!');
          this.getShifts();
        });
      }
    });
  }

  getDuration(start, end) {
    const difference = (new Date(end).getTime() - new Date(start).getTime());

    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor(((difference % 86400000) % 3600000) / 60000);

    let duration = `${hours} hours`;

    if (minutes !== 0) {
      duration += ` and ${minutes} minutes`;
    }

    return duration;
  }

  private getShifts() {
    this.shiftService.getAll().subscribe((result: Shift[]) => {
      this.shifts = result;
      this.shiftNames = this.shifts.map(a => a.name.toLowerCase());
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the shifts');
      });
  }
}
